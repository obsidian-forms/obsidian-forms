import {
	TextControl,
	SelectControl,
	RadioControl,
} from '@wordpress/components';

/**
 * Component for rendering form settings.
 *
 * @param {Object} props Props passed to the component.
 * @return {Object} The rendered component.
 */
const ObsidianFieldSettings = ( props ) => {
	const { fieldSettings, handleSettingChange } = props;

	return (
		<>
			{ fieldSettings &&
				// Loop through the fieldSettings object
				Object.entries( fieldSettings ).map( ( [ key, settings ] ) => {
					// Depending on the 'type', render different controls
					if ( settings.type === 'select' ) {
						return (
							<SelectControl
								key={ key }
								label={ settings.label }
								value={ settings.value }
								options={ settings.options }
								onChange={ ( value ) =>
									handleSettingChange( key, value )
								}
							/>
						);
					}

					if ( settings.type === 'radio' ) {
						return (
							<RadioControl
								key={ key }
								label={ settings.label }
								selected={ settings.value }
								options={ settings.options }
								onChange={ ( value ) =>
									handleSettingChange( key, value )
								}
							/>
						);
					}

					return (
						<TextControl
							key={ key }
							label={ settings.label }
							value={ settings.value }
							onChange={ ( value ) =>
								handleSettingChange( key, value )
							}
						/>
					);
				} ) }
		</>
	);
};

export default ObsidianFieldSettings;
