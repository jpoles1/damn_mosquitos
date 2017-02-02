router.get("/register", (req, res) => {
  res.render("register.hbs", res.page_data);
})
api_router.post("/register", (req, res) => {
  console.log(req.body)
  db.users.insert(req.body)
  if(success){
    res.json({success: 1})
  }
  else{
    res.json({err: "Username is already taken."})
    res.json({err: "Email is already taken."})
  }
})
