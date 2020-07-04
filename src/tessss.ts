var passport = require('passport')
var ActiveDirectoryStrategy = require('passport-activedirectory')
var ActiveDirectory = require('activedirectory')



var ad = new ActiveDirectory({
    url: 'ldap://my.domain.com',
    baseDN: 'DC=my,DC=domain,DC=com',
    username: 'readuser@my.domain.com',
    password: 'readuserspassword'
  })
  
  passport.use(new ActiveDirectoryStrategy({
    integrated: false,
    ldap: ad
  }, function (profile, ad, done) {
    ad.isUserMemberOf(profile._json.dn, 'AccessGroup', function (err, isMember) {
      if (err) return done(err)
      return done(null, profile)
    })
  }))



