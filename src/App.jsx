import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Jobpage, { jobLoader } from "./pages/Jobpage";
import AddJobPage from "./pages/AddjobPage";
import EditJobPage from "./pages/EditJobPage";





const App = () => {
 // add job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return
  };    // we use this component so that when we add a new job it will take us to the jobs page 
  

  //delete job 
 const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE'  
   
    });
      return;
 
 }

 // update  job

 const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(job),
  });
  return
 }

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage  />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage  updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="/jobs/:id" element={<Jobpage deleteJob={ deleteJob } />} loader={jobLoader} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
