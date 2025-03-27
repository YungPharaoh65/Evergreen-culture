 

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes> 
        <Route path="/" element={<App />} /> {/* This link is the homepage bcos it's the first one you will see */}
         
      </Routes>
    </HashRouter>
  );
};

/**
 * 
 *   <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/trackinglist" element={<Trackinglist />} />
        <Route path="/profile" element={<Profile />} />
 */


export default React.memo(RouteSwitch);