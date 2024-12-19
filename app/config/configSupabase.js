const { createClient } = require('@supabase/supabase-js')
let dotenv = require('dotenv').config();
if(dotenv.error){
    throw dotenv.error;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
    supabaseUrl,
    supabaseKey
)

module.exports = supabase;