// Import internal dependencies.
import ObsidianFieldLabel from '../components/ObsidianFieldLabel';
import ObsidianFieldControlsCheckbox from '../controls/Checkbox';

/**
 * Component for rendering form settings.
 *
 * @param {Object}   props                         Props passed to the component.
 * @param {Object}   props.attributes              Attributes passed to the component.
 * @param {string}   props.requiredIndicator       The required indicator.
 * @param {Function} props.handleLabelChange       Function to handle label change.
 * @param {Function} props.handleExtraPropsChange  Function to handle extra props change.
 * @param {Function} props.handleFieldOptionChange Function to handle field option change.
 *
 * @return {Object} The rendered component.
 */
const ObsidianFieldCheckbox = ( {
	attributes,
	requiredIndicator,
	handleLabelChange,
	handleExtraPropsChange,
	handleFieldOptionChange,
} ) => {
	const { fieldName, fieldType, fieldOptions, extraProps } = attributes;

	return (
		<>
			<ObsidianFieldControlsCheckbox
				attributes={ attributes }
				handleExtraPropsChange={ handleExtraPropsChange }
				handleFieldOptionChange={ handleFieldOptionChange }
			/>

			<ObsidianFieldLabel
				attributes={ attributes }
				requiredIndicator={ requiredIndicator }
				handleLabelChange={ handleLabelChange }
			/>

			<div
				className={ `wp-block-obsidian-form-field__checkboxes wp-block-obsidian-form-field__checkboxes--${ extraProps.checkboxesLayout }` }
			>
				{ fieldOptions.map( ( option, index ) => (
					<div
						key={ index }
						className="wp-block-obsidian-form-field__checkbox"
					>
						<input
							value={ option.value }
							name={ fieldName }
							type={ fieldType }
							className={ `wp-block-obsidian-form-field__input wp-block-obsidian-form-field__input-${ fieldType }` }
						/>{ ' ' }
						{ option.label }
					</div>
				) ) }
			</div>
		</>
	);
};

export default ObsidianFieldCheckbox;
