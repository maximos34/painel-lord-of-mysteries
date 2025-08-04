import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function App() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/content')
      .then(res => res.json())
      .then(setContent);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#222', padding: 16 }}>
      <Text style={{ fontSize: 24, color: '#fff', marginBottom: 16 }}>
        Lord of Mysteries - SaaS
      </Text>
      {content.map((item, idx) => (
        <View key={idx} style={{ backgroundColor: '#333', marginBottom: 12, padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#c9a469', fontWeight: 'bold' }}>{item.url}</Text>
          <Text style={{ color: '#eee', marginTop: 8 }}>{item.text.slice(0, 300)}...</Text>
        </View>
      ))}
    </ScrollView>
  );
}
