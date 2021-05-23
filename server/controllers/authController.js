const [ User, Admin ]  = require('../models/User');
const Form = require('../models/Form');
const jwt = require('jsonwebtoken');


const refreshTokens = [];

const createToken = id => {
    const accessToken = jwt.sign({id}, "access-SecretKey", {expiresIn: '20s'});
    const refreshToken = jwt.sign({id}, "refresh-SecretKey", {expiresIn: '7d'});
    refreshTokens.push(refreshToken);

    return [accessToken, refreshToken];
}

module.exports.protected_post = async (req, res) => {
    console.log(req.user);
    res.send({success : 'Protected Route', email: req.user.email, admin: req.user.admin });
}

module.exports.renewToken_post = async (req, res) => {
    const refreshToken = req.body.token;
    
    if(!refreshToken || !refreshTokens.includes(refreshToken)) res.status(200).json({error: 'User not authenticated'})

    jwt.verify(refreshToken, "refresh-SecretKey", async (err, decodedToken) => {
        if(!err) {
            const accessToken = jwt.sign({id : decodedToken.id}, "access-SecretKey", {expiresIn: '20s'})
            return res.status(201).json({ success: true, accessToken });
            
        } else res.status(200).json({error: 'User not authenticated'})
    })

}

module.exports.register_post = async (req, res) => {
    const { email, password, admin } = req.body;

    try {
        const user = admin ? await Admin.create({ email, password, admin }) : await User.create({ email, password, admin });

        const [ accessToken, refreshToken ] = createToken(user._id);

        res.status(201).json({ success : {user: admin ? 'admin' : 'user', email}, token: { accessToken, refreshToken }});

        console.log(admin ? 'Admin ->' + `${user} added.` : 'User ->' + `${user} added.`);

    } catch (error) {
        res.status(400).json({ error: 'Error Adding User'})
    }

}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email }) ? await User.findOne({email}) : await Admin.findOne({email})

        if(!user) res.status(201).json({ error: 'Email does not exist' })

        const auth = user.password === req.body.password ? true : false;

        if( !auth ) res.status(201).json({ error :'Password Does Not Match' })
        
        else if(auth && user) {
            const [ accessToken, refreshToken ] = createToken(user._id);

            if(user.admin) res.status(201).json({ success : { user: 'admin', email }, token: { accessToken, refreshToken }})
            else res.status(201).json({ success : { user: 'user', email }, token: { accessToken, refreshToken }})
        }

    } catch (error) {
        console.log(error);
        res.status(200).json({ error : 'Something went wrong' })
    }
}

module.exports.form_post = async (req, res) => {
    const { book, email } = req.body;

    try {
        const user = await User.findOne({ email })
        
        if(user) {

            const form = new Form({ book, userId: user._id, email });
            await form.save();
            res.status(201).send({ success: 'Data Added' })

        } else res.status(201).send({ error: 'User does not exist'})


    } catch (error) {
        res.status(201).send({ error : 'Something went wrong' })
    }
}

module.exports.form_get = async (req, res) =>{
    const { email } = req.query;

    try {
        const user = await Admin.findOne({ email })
        
        if(user) {
            const form = await Form.find({});
            res.status(201).send(form);

        }else res.status(201).send(`User not Authorized!`)
    } catch (error) {
        res.status(201).send({ error : 'Something went wrong' })       
    }
}