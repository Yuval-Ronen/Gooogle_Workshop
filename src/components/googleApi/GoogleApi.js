



export const extractUserData = (response) => {
    console.log("got response:")
    console.log(response)
    if(response && response.profileObj){
        return {
            email: response.profileObj.email,
            familyName: response.profileObj.familyName,
            givenName: response.profileObj.givenName,
            googleId: response.profileObj.googleId,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name,
        }
    }

    return {}
}