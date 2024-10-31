import { supabase } from '@/supabaseClient';

async function getAllMeetingSummaries(userId) {
    console.trace("Fetch")
  const { data, error } = await supabase
    .from('meeting_history')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Erreur lors de la récupération des comptes rendus:', error);
    return null;
  } else {
    return data;
  }
}

async function deleteMeetingSummary(id) {
    const { error } = await supabase
      .from('meeting_history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression du compte rendu:', error);
    }
  }

export { getAllMeetingSummaries, deleteMeetingSummary };