import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackButton from '../../components/BackButton';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <BackButton />
        <Text style={styles.title}>Sobre o App</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.paragraph}>
          Bem-vindo ao nosso aplicativo de salão de beleza! Nosso objetivo é
          fornecer uma experiência incrível tanto para clientes quanto para
          proprietários de salões.
        </Text>
        <Text style={styles.paragraph}>
          Como cliente, você pode encontrar e agendar serviços de beleza com
          facilidade. Navegue pelos salões disponíveis, veja os serviços
          oferecidos, confira avaliações de outros clientes e agende seu
          atendimento em poucos cliques.
        </Text>
        <Text style={styles.paragraph}>
          Como proprietário de salão, você pode gerenciar seu negócio de forma
          eficiente. Adicione e edite serviços, gerencie agendamentos,
          acompanhe as avaliações dos clientes e muito mais.
        </Text>
        <Text style={styles.paragraph}>
          Nosso aplicativo foi desenvolvido pensando na sua conveniência e
          satisfação. Agradecemos por escolher nosso app e esperamos que você
          tenha uma experiência maravilhosa!
        </Text>
        <Text style={styles.paragraph}>
          Para qualquer dúvida ou suporte, entre em contato conosco pelo email:
          belezaxpressajuda@gmail.com
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4F4F4F',
    marginTop:40
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    color: '#4F4F4F',
    lineHeight: 24,
  },
});


