exports.getAllMovies =  (req, res) => {
    res.status(200).json({
        "status": "success",
        "requestedAt": req.requestTime,
        "data": { 
            message: 'All movies found from artflix', 
            app: "artflix" 
        }
    });
};

exports.getMovie = (req, res) => {

    const id = req.params.id * 1;

    res.status(200).json({
        "status": "success",
        "data": { 
            message: 'Movie found', 
            app: "artflix" 
        }
    });
};

exports.addMovie = (req, res) => {
    res.status(201).send('Post method');
};

exports.updateMovie = (req, res) => {

};

exports.deleteMovie = (req, res) => {
    res.status(204).json({
        "status": "success",
        "data": null
    });
};