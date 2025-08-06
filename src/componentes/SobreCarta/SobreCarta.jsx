import './SobreCarta.css';

export const SobreCarta = ({ onOpenLetter }) => {

  return (
    <div className="sobre-container">

      <div 
        className="envelope"
        onClick={onOpenLetter}
      >
        <div className="envelope-flap"></div>
        <div className="envelope-body"></div>
        <div className="envelope-heart">❤️</div>
      </div>

      <p className="sobre-outro-text">¡Hacé clic para descubrirlo!</p>
    </div>
  );
};
