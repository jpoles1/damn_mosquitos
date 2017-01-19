var get_ip = require('ipware')().get_ip;

//Middleware capabilities
router.use((req, res, next) => {
  res.page_data = {layout: "base"};
  res.page_data.BASE_URL = process.env.BASE_URL;
  res.ip_info = get_ip(req);
  res.page_data = {"visitor_ip": res.ip_info.clientIp}
  next();
})

//Content routers
require("./submit")
require("./manage")
