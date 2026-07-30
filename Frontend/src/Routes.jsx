import { Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "./components/molecules/protectedRoute/ProtectedRoute"
import { SigninContainer } from "./components/organisms/auth/SignInContainer"
import { SignUpContainer } from "./components/organisms/auth/SignUpContainer"
import { Auth } from "./pages/auth/Auth"
import { Home } from "./pages/home/Home"
import { NotFound } from "./pages/notFound/NotFound"
import { Channel } from "./pages/workspace/channel/Channel"
import { JoinCodePage } from "./pages/workspace/JoinCodePage"
import { JoinPage } from "./pages/workspace/JoinPage"
import { WorkspaceLayout } from "./pages/workspace/WorkspaceLayout"

export const AppRoutes = ()=>{
    return (
        <Routes>
              <Route path='/signup' element = {<Auth><SignUpContainer/></Auth>}/>
              <Route path='/signin' element = {<Auth><SigninContainer/></Auth>}/>
              <Route path='/home' element = {<ProtectedRoute><Auth><Home /></Auth></ProtectedRoute>}  />
              <Route path='/workspaces/:workspaceId' element = {<ProtectedRoute> <WorkspaceLayout /></ProtectedRoute>}  />
              <Route path='/workspaces/:workspaceId/channels/:channelId' element={<ProtectedRoute><WorkspaceLayout><Channel /></WorkspaceLayout></ProtectedRoute>} />
              <Route path="/join" element={<ProtectedRoute><JoinCodePage /></ProtectedRoute>} />
              <Route path="/join/:joincode" element={<ProtectedRoute><JoinPage /></ProtectedRoute>} />
              
              <Route path='/*' element = {<NotFound />} />
        </Routes>
    )
}
