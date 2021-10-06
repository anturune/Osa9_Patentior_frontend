import React from 'react';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

type IconProps = {
    gendre: string;
};
//Uros ja naarasmerkin renderöinti
const GendreSymbol = ({ gendre }: IconProps) => {
    //console.log('GENDRE', gendre);
    const maleGendre: SemanticICONS = 'mars';
    const femaleGendre: SemanticICONS = 'venus';

    if (gendre === "female") {
        return (
            <>
                {<Icon name={femaleGendre} />}
            </>
        );
    }
    return (
        <>
            {<Icon name={maleGendre} />}
        </>);
};

export default GendreSymbol;
