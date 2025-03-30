module.exports = {
  afterCreate(event) {
    console.log('Entity created, webhook should trigger:', event);
  },
  afterUpdate(event) {
    console.log('Entity updated, webhook should trigger:', event);
  },
};
