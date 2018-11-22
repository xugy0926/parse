Parse.Cloud.job('health', function() {
  setTimeout(() => {
    console.log('Working properly')
  }, 1000)
})
