import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Message = {
  from: 'me' | 'other';
  text: string;
};

type FormType = 'register' | 'details' | 'description' | 'match' | 'interest' | null;

type FormData = {
  phone: string;
  combined: string;
};

const ChatBody: React.FC = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [messages, setMessages] = useState<Message[]>([]);
  const [formType, setFormType] = useState<FormType>(null);
  const [formData, setFormData] = useState<FormData>({
    phone: '254708374149',
    combined: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = (from: 'me' | 'other', text: string) => {
    setMessages(prev => [...prev, { from, text }]);
  };

 const API_BASE_URL = "https://f052e4ef1a19.ngrok-free.app";

const handleSubmit = async () => {
  setLoading(true);
  const phone = formData.phone;
  const values = formData.combined.split('#').map(v => v.trim());
  let url = '';
  let payload: Record<string, any> = { phone };

  try {
    switch (formType) {
      case 'register':
        url = `${API_BASE_URL}/register`;
        payload = {
          phone,
          name: values[0],
          age: values[1],
          gender: values[2],
          county: values[3],
          town: values[4],
        };
        break;
      case 'details':
        url = `${API_BASE_URL}/details`;
        payload = {
          phone,
          education: values[0],
          profession: values[1],
          marital_status: values[2],
          religion: values[3],
          ethnicity: values[4],
        };
        break;
      case 'description':
        url = `${API_BASE_URL}/description`;
        payload = { phone, description: values[0] };
        break;
      case 'match':
        url = `${API_BASE_URL}/match`;
        payload = { phone, age_range: values[0], town: values[1] };
        break;
      case 'interest':
        url = `${API_BASE_URL}/interest`;
        payload = { phone, interests: values[0] };
        break;
      default:
        return;
    }

    const res = await axios.post(url, payload);

    if (formType === 'match') {
      const matchList = res.data.matches?.map(
        (m: any) => `${m.name}, Age: ${m.age}, Phone: ${m.phone}`
      ).join('\n') || 'No matches found.';
      addMessage('other', matchList);
    } else {
      addMessage('other', res.data.message);
    }
  } catch (err) {
    addMessage('other', 'An error occurred. Check your internet connectivity.');
    console.error(err);
  } finally {
    setLoading(false);
    setFormType(null);
    setFormData({ ...formData, combined: '' });
  }
};


  const getPlaceholder = (): string => {
    switch (formType) {
      case 'register': return 'name#age#gender#county#town';
      case 'details': return 'education#profession#marital_status#religion#ethnicity';
      case 'description': return 'description';
      case 'match': return 'age_range#town';
      case 'interest': return 'interests';
      default: return '';
    }
  };

  return (
    <View style={homeStyles.container}>
      <ScrollView style={homeStyles.chatContainer}>
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              homeStyles.message,
              msg.from === 'me' ? homeStyles.messageRight : homeStyles.messageLeft,
              msg.from === 'me' ? homeStyles.bgRight : homeStyles.bgLeft,
            ]}
          >
            <Text style={msg.from === 'me' ? homeStyles.textWhite : homeStyles.textDark}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
        )}
      </ScrollView>

      {formType && (
        <View style={homeStyles.form}>
          <TextInput
            placeholder="Phone (e.g. 2547...)"
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            style={homeStyles.input}
          />
          <TextInput
            placeholder={getPlaceholder()}
            value={formData.combined}
            onChangeText={text => setFormData({ ...formData, combined: text })}
            style={homeStyles.input}
          />
          <TouchableOpacity style={homeStyles.submitBtn} onPress={handleSubmit}>
            <Text style={homeStyles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={homeStyles.actions}>
        {['register', 'details', 'description', 'match', 'interest'].map((type, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setFormType(type as FormType)}
            style={homeStyles.actionBtn}
          >
            <Text style={homeStyles.actionText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ChatBody;
