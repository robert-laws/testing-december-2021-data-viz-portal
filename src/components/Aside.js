export const Aside = ({ children }) => {
  return (
    <aside className='right-sidebar'>
      <p>Your Statistics</p>
      {children}
    </aside>
  );
};
