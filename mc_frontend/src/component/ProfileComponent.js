const ProfileComponent = (props) => {
    return ( <div className="profile-Cntr">
        <div className="profile-img"></div>
        <div className="center profile-info">
            <h2>{props.username}</h2>
            <div>#{props.id}</div>
        </div>
    </div> );
}
 
export default ProfileComponent;