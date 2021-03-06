import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem/TeacherItem";
import { ScrollView, TextInput, BorderlessButton, RectButton} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isFilterVisible, setisFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then((response) => {
        if (response) {
          const favoritedTeacher = JSON.parse(response);
          const favoritedTeacherIds = favoritedTeacher.map((teacher: Teacher) => {
            return teacher.id;
          });
  
          setFavorites(favoritedTeacherIds);
        }
      });
  }

  useFocusEffect(() =>{
      loadFavorites();
  })

  async function handleToglleFilterVisible() {
    setisFilterVisible(!isFilterVisible);
  }

  async function handleFilterSubmit() {
    loadFavorites();
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setisFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíves"
        headerRight={
          <BorderlessButton onPress={handleToglleFilterVisible}>
            <Feather name="filter" size={20} color="#FFF"></Feather>
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual é a matéria:"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Dia o dia?"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual Horário?"
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
