

var ProfileEntity = function (id, username, full_name, is_private, pfp, is_verified, last_story) {
    this.id = id;
    this.username = username;
    this.full_name = full_name;
    this.is_private = is_private;
    this.pfp = pfp;
    this.is_verified = is_verified;
    this.last_story = last_story

}

export default ProfileEntity