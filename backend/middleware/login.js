
const isLoggedIn = (req, res, next) =>
{
    try
    {
        req.user ? next() : res.sendStatus(401);
    }

    catch
    {
        return res.status(500).json({error: "Unexpected error occured"});
    }
}

module.exports = isLoggedIn;