// supabase/client.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zvopiynzgfybvqqgvojj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2b3BpeW56Z2Z5YnZxcWd2b2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzUwMzgsImV4cCI6MjA1OTE1MTAzOH0.uqhGoWt4aUdyEY9Q3xDK-klHtJNqd5Pv7z1WYZZQSxQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
