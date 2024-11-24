/** @format */

module.exports = {
   apps: [
      {
         name: "Chic-Aura-React",
         script:
            "C:/Users/ASUS/AppData/Roaming/nvm/v16.17.0/node_modules/yarn/bin/yarn.js",
         args: "start:prod",
         watch: false,
         env: {
            NODE_ENV: "production",
         },
         instances: 1,
         exec_mode: "cluster",
      },
   ],
};
