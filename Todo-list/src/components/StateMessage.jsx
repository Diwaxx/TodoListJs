function StateMessage({ title, message, children }) {
  return (
    <section className="panel state-message">
      <h2 className="state-message__title">{title}</h2>
      <p className="state-message__text">{message}</p>
      {children}
    </section>
  )
}

export default StateMessage
