import parse from 'html-react-parser'

interface EventAgendaProps {
   date: string;
   time: string;
   details: string
}

const EventAgenda = (props: EventAgendaProps) => {
   return (
      <>
         <div className="table table-md border">
            <thead>
               <tr>
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Materi</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{props.date}</td>
                  <td>{props.time}</td>
                  <td>{parse(props.details || "")}</td>
               </tr>
            </tbody>
         </div>
      </>
   )
}

export default EventAgenda