import { Mission } from "./Mission"

const missions = [{
  title: 'VLOG DE NOËL',
  duration: '7minutes',
  ressourceNb: 23,
  modelName: 'Modèle Vlog surprise',
  client: 'Pierre Matalia',
  date: new Date('2023-09-22'),
  deadline: new Date('2023-10-22'),
  cover: '/img/home/woman_back.jpg'
},
{
  title: 'SEB AU KIRGHIZISTAN',
  duration: '27minutes',
  ressourceNb: 33,
  modelName: 'Modèle Video YT',
  client: 'Jeanne Soriano',
  date: new Date('2023-09-22'),
  deadline: new Date('2023-12-22'),
  cover: '/img/home/man_van_computer.jpg'
},
{
  title: 'VLOG DE NOËL',
  duration: '7minutes',
  ressourceNb: 23,
  modelName: 'Modèle Vlog surprise',
  client: 'Pierre Matalia',
  date: new Date('2023-09-22'),
  deadline: new Date('2023-10-22'),
  cover: '/img/home/woman_back.jpg'
}]

export const DashboardEditorMissions = () => {
  return (
    <div className="">
      <h1 className="dashboard-title text-2xl pt-6">Mes missions en cours</h1>
      <div className="flex flex-col gap-6 mt-12">
        {missions && missions.map((mission, i) => {
          return (
            <Mission key={i} data={mission} />
          )
        })}
      </div>
    </div>
  )
}