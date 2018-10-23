module.exports = (app)=>{
  var home = app.controllers.home;
  app.get('/', home.index);
  app.get('/configs', home.config);
  app.post('/saveconfig', home.saveconfig);
  app.post('/savereadings', home.savereadings);
};