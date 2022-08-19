

var ProfileEntity = function (id, username, full_name, is_private, pfp, is_verified) {
    this.id = id;
    this.username = username;
    this.full_name = full_name;
    this.is_private = is_private;
    this.pfp = pfp;
    this.is_verified = is_verified;
}

export default ProfileEntity
