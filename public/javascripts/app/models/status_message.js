app.models.StatusMessage = app.models.Post.extend({
  url : function(){
    return this.isNew() ? '/status_messages' : '/posts/' + this.get("id");
  },

  mungeAndSave : function(){
    var mungedAttrs = {
      status_message : _.clone(this.attributes),
      'aspect_ids[]' : this.get("aspect_ids"),
      photos : this.photos.pluck("id"),
      services : mungeServices(this.get("services"))
    }

    this.save(mungedAttrs)

    function mungeServices (values) {
      if(!values) { return; }
      return values.length > 1 ?  values :  [values]
    }
  }
});
