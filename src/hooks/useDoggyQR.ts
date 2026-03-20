import { useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { supabase } from '../lib/supabase';

const generateRandomId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < 5; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
};

export const useDoggyQR = () => {
    const [storageUrl, setStorageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [randomId, setRandomId] = useState('');
const generateNewQR = useCallback(async () => {
  console.log('🚀 START generateNewQR');
  
  const newId = generateRandomId();
  setRandomId(newId);
  console.log('1️⃣ NEW ID:', newId);
  setLoading(true);

  try {
    // 1. INSERT animal
    console.log('2️⃣ INSERT animal(id:', newId, ')');
    const { error: insertError, data: insertData, count: insertCount } = await supabase
      .from('animal')
      .insert({ id: newId })
      .select('id')
      .single();
    
    console.log('INSERT result:', { error: insertError, data: insertData, count: insertCount });
    if (insertError) throw insertError;

    // Vérif ligne créée
    const { data: verifyData } = await supabase
      .from('animal')
      .select('id')
      .eq('id', newId)
      .single();
    console.log('✅ Ligne existe:', verifyData);

    // 2. QR + Storage (ton code)
    console.log('3️⃣ Génère QR...');
    const dataUrl = await QRCode.toDataURL(`https://doggytracker.onrender.com/${newId}`);
    const base64Data = dataUrl.split(',')[1];
    const fileBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    console.log('4️⃣ Upload storage qr-${newId}.png');
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('qr-code')
      .upload(`qr-${newId}.png`, fileBytes, {
        contentType: 'image/png',
        upsert: true
      });
    console.log('STORAGE result:', { error: uploadError, data: uploadData });
    if (uploadError) throw uploadError;

    // 5. Public URL
    const { data: urlData } = supabase.storage
      .from('qr-code')
      .getPublicUrl(`qr-${newId}.png`);
    console.log('5️⃣ URL générée:', urlData.publicUrl);

    // 6. UPDATE qr_url
    console.log('6️⃣ UPDATE animal qr_url =', urlData.publicUrl);
    const { error: updateError, data: updateData, count: updateCount, status } = await supabase
      .from('animal')
      .update({ qr_url: urlData.publicUrl as any })
      .eq('id', newId)
      .select('id, qr_url');  // Retourne ligne mise à jour
    
    console.log('UPDATE result:', { 
      error: updateError, 
      data: updateData, 
      count: updateCount, 
      status 
    });
    if (updateError) throw updateError;

    // Vérif final DB
    const { data: finalCheck } = await supabase
      .from('animal')
      .select('qr_url')
      .eq('id', newId)
      .single();
    console.log('7️⃣ FINAL DB qr_url:', finalCheck?.qr_url);

    setStorageUrl(urlData.publicUrl);
    console.log('🎉 SUCCESS total');
  } catch (error) {
    console.error('💥 ERREUR complète:', error);
  }
  setLoading(false);
}, []);


    return {
        randomId,
        storageUrl,
        generateNewQR,
        loading
    };
};
