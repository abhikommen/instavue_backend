

var ProfileEntity = function (id, username, full_name, is_private, pfp, is_verified, followers, following, bio, query_hash) {
    this.id = id;
    this.username = username;
    this.full_name = full_name;
    this.is_private = is_private;
    this.pfp = pfp;
    this.is_verified = is_verified;
    this.followers = followers;
    this.following = following
    this.bio = bio
    this.query_hash = query_hash
}

export default ProfileEntity
