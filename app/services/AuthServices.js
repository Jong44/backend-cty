const supabase = require("../config/configSupabase")

function Auht () {
    
}

const register = async (email, password) => {
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password
    });
    if (error) throw new Error(error.message);
    return data;
}

const login = async (email, password) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data;
}

const logout = async () => { 
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
}


module.exports ={
    register,
    login,
    logout
}