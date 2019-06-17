import * as React from 'react';
import * as _ from 'underscore';

interface FuncProps {
    data: Array<string>,
    selectedItem: string,
    _onSelect: (value: string) => void
}

const DropdownButton: React.FunctionComponent<FuncProps> = ({ data, selectedItem, _onSelect }) => {

    const onSelectItem = (value: string) => _onSelect(value)

    return (
        <div className="dropdown">
            <button className="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selectedItem}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                    _.map(data, (d: string, i: number) => <a key={i} className="dropdown-item" href="#" onClick={() => onSelectItem(d) }>{d}</a>)
                }
            </div>
        </div>
    );
}

export default DropdownButton;