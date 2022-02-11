module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6a1f17ab67cd512d1a86857f79e3e1f6'),
  },
});
