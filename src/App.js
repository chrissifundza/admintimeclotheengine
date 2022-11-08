import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import { UIProvider } from "./context/ui";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Shop from "./scenes/addshop";
import AddProduct from "./scenes/addproduct";
import UpdateOrder from "./scenes/updateorder";
import ViewProduct from "./scenes/viewproduct";
import Signup from "./scenes/signup/Signup";
import SignIn from './scenes/signin/SignIn'
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import View from "./scenes/View user";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UIProvider>
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
           
            <Routes>
            <Route path="/" element={<SignIn/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<Signup  />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/viewuser" element={<View/>}/>
              <Route path="/vieworder" element={<UpdateOrder/>}/>
              <Route path="/viewproduct" element={<ViewProduct />}/>
            </Routes>
          </main>
        </div>
        </UIProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
