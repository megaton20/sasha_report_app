exports.statusChecker = (req, res, next) => {

    console.log(Date.now().toLocaleString);
    next()
    // if (navigator.onLine) {
    //     req.flash('success_msg','you are online')
    //     console.log("online")
    //   } else {
    //     req.flash('error_msg','you are offline')
    //     console.log("online")
    //   }
}
  