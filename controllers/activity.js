const Activity = require("../models/activity")

async function getAllActivities(req, res) {
  try {
    var opts = {}
    if (req.query.email) {
      Object.assign(opts, {
        where: {
          email: req.query.email
        }
      })
    }
    var activities = await Activity.findAll(opts)
    return res.json({
      status: "Success",
      message: "Success",
      data: activities
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function getActivity(req, res) {
  try {
    var activity = await Activity.findOne({
      where: {
        activity_id: req.params.actId
      }
    })
    if (!activity) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.actId} Not Found`,
      })
    }

    return res.json({
      status: "Success",
      message: "Success",
      data: activity
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function createActivity(req, res) {
  try {
    var required = ['title']
    while (required.length) {
      var prop = required.shift()
      if (!req.body[prop]) {
        return res.status(400).json({
          status: "Bad Request",
          message: `${prop} cannot be null`
        })
      }
    }

    var activity = await Activity.create({
      title: req.body.title,
      email: req.body.email || '',
    })

    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: activity
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function updateActivity(req, res) {
  var activity = await Activity.findOne({
    where: {
      activity_id: req.params.actId
    }
  })
  if (!activity) {
    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${req.params.actId} Not Found`,
    })
  }

  if (req.body.title) {
    activity.title = req.body.title
  }
  if (req.body.email) {
    activity.email = req.body.email
  }
  await activity.save()

  return res.json({
    status: "Success",
    message: `Success`,
    data: activity
  })
}

async function destroyActivity(req, res) {
  var activity = await Activity.findOne({
    where: {
      activity_id: req.params.actId
    }
  })
  if (!activity) {
    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${req.params.actId} Not Found`,
    })
  }
  await activity.destroy()
  return res.json({
    status: "Success",
    message: "Success",
    data: {}
  })
}


module.exports = {
  getAllActivities,
  getActivity,
  createActivity,
  updateActivity,
  destroyActivity
}