import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Dropdown from '../../components/Dropdown';
import BoxShadowPopup from './BoxShadowPopup';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffectsStyleUpdates } from './effectsHooks';

export default function EffectsDashboard() {
    const [effects, setEffects] = useState([]);
    useEffectsStyleUpdates({ effects: effects });

    const EFFECTS = [
        "Box Shadow"
    ];

    const EFFECTS_COMPONENTS = {
        "Box Shadow": (effect, setEffectKey) => <BoxShadowPopup effect={effect} setEffectKey={setEffectKey} />,
    };

    function addNewEffect() {
        setEffects((arr) => {
            let arrCopy = [...arr];
            arrCopy.push({
                type: "Box Shadow",
                x: "0px",
                y: "0px",
                blur: "2px",
                spread: "2px",
                color: { hex: "#D3D3D3" },
                opacity: 100 
            })
            return arrCopy;
        })
    }

    function removeEffect(i) {
        setEffects((arr) => {
            let arrCopy = [...arr];
            arrCopy.splice(i, 1);
            return arrCopy;
        })
    }

    function changeEffectKey(index, key, value) {
        setEffects((arr) => {
            let arrCopy = [...arr];
            arrCopy[index] = {...arrCopy[index], [key]: value}
            return arrCopy;
        })
    }

    function setEffectKeyWrapper(index) {
        return (key, value) => changeEffectKey(index, key, value);
    }

    return (
        <div className="container">
            <div className="category-header enable-flex">
                <div className="bold" style={{ flex: 1 }}>Effects</div>
                <div 
                    className="icon-btn"
                    onClick={addNewEffect}
                >
                    <AddIcon
                        sx={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
            {effects.map((effect, index) => (
                <div className="enable-flex" style={{ marginTop: "15px", marginBottom: "15px", alignItems: "center" }}>
                    <div style={{ marginRight: "15px" }}>
                        {EFFECTS_COMPONENTS[effect.type](effect, setEffectKeyWrapper(index))}
                    </div>
                    <Dropdown
                        options={EFFECTS}
                        displayOption={effect.type}
                        setDisplayOption={(val) => changeEffectKey(index, "type", val)}
                    />
                    <div style={{ flex: 1 }}></div>
                    <div
                        className="icon-btn" 
                        onClick={() => removeEffect(index)}
                    >
                        <RemoveIcon sx={{ height: "100%", width: "100%" }} />
                    </div>
                </div>
            ))}
        </div>
    );
}