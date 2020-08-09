import React from 'react'
import './styles.css'
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../service/api'


export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
  }
  interface TeacherItemProps {
    teacher: Teacher;
  }


const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id,
        })  
    }

    return (
            <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
                </header>
                <p>
                     {teacher.bio}<br/>

                </p>
                <footer>
                    <p>
                        Preço/Hora:
                        <strong>R${teacher.cost}</strong>
                    </p>
                    <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                        <img src={whatsAppIcon} alt="whatsapp"/>
                        Entrar em contato
                    </a>
                </footer>
            </article>
            )
        }



export default TeacherItem