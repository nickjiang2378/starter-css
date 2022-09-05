export default function PropertyInput({ renderInput, prop }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>{prop}</span>
            <span style={{ flex: 1, minWidth: '10px' }}></span>
            {renderInput}
        </div>
    );
}