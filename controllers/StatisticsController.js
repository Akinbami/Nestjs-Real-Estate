const StatisticsService = require('../service/Statistics');
const dbConnection = require('../mongoose');


exports.index = async (req, res) => {
    // this controller gets the details of the agent making the request
    //   const { user } = req;
    await dbConnection();

    const statistics = await StatisticsService.getStatistics();
    res.json({
        message: 'statistics fetched successfully!',
        data: statistics,
    });
};