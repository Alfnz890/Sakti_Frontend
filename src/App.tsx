import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Main/Home'
import Admin from './pages/Admin/Events/Events'
import EventDetail from './pages/Main/EventDetail'
import AllEvents from './pages/Main/AllEvents'
import Report from './pages/Report/Report'
import ReportDetail from './pages/Report/ReportDetail'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import AdminLogin from './pages/Auth/AdminLogin'
import Events from './pages/Admin/Events/Events'
import Form from './pages/Admin/Events/Form'
import About from './pages/About/About'
import Partners from './pages/Partners/Partners'
import UserDashboard from './pages/UserDashboard/myEvent'
import Users from './pages/Admin/Users/Users'
import ReportAdmin from './pages/Admin/Report/Report'
import EventForm from './pages/Admin/Events/Form'
import ReportForm from './pages/Admin/Report/Form'
import MyProfile from './pages/UserDashboard/MyProfile'
// import ProtectedRoute from './components/ProtectedRoute'
import EditFormReport from './pages/Admin/Report/EditForm'
import EditEvent from './pages/Admin/Events/EditEvent'
import Audience from './pages/Admin/Events/Audience'
import DashboardAdmin from './pages/Admin/Dashboard/DashboardAdmin'
import Speaker from './pages/Admin/Speaker/Speaker'
import SpeakerForm from './pages/Admin/Speaker/Form'
import EditSpeaker from './pages/Admin/Speaker/EditSpeaker'
import Category from './pages/Admin/Category/Category'
import FormCategory from './pages/Admin/Category/Form'

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/detail/:id' element={<EventDetail />} />
            <Route path='/allEvents' element={<AllEvents />} />
            <Route path='/report' element={<Report />} />
            <Route path='/reportDetail/:id' element={<ReportDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/about' element={<About />} />
            <Route path='/partners' element={<Partners />} />
            <Route path='/user/dashboard/:id' element={<UserDashboard />} />
            <Route path='/user/myprofile/:id' element={<MyProfile />} />

            {/* Admin Routes */}
            <Route path='/dashboard' element={<DashboardAdmin />} />
            <Route path='/dashboard/event' element={<Events />} />
            <Route path='/dashboard/event/add' element={<Form />} />
            <Route path='/dashboard/history/form' element={<ReportForm />} />
            <Route path='/dashboard/events/form' element={<EventForm />} />
            <Route path='/dashboard/users' element={<Users />} />
            <Route path='/dashboard/report' element={< ReportAdmin />} />
            <Route path='/dashboard/report/update/:id' element={< EditFormReport />} />
            <Route path='/dashboard/event/edit/:id' element={< EditEvent />} />
            <Route path='/dashboard/event-audience/:id' element={< Audience />} />
            <Route path='/dashboard/speaker' element={< Speaker />} />
            <Route path='/dashboard/speaker/form' element={< SpeakerForm />} />
            <Route path='/dashboard/speaker/edit/:id' element={< EditSpeaker />} />
            <Route path='/dashboard/category' element={< Category />} />
            <Route path='/dashboard/category/form' element={<  FormCategory />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App