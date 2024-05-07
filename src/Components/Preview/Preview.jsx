function Preview({ result, onClose }) {
    return (
        <div style={overlayStyle}>
            <div style={contentStyle}>
                <h2>Preview</h2>
                <p>{result.name}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const contentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
};

export default Preview;