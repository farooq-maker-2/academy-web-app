const PersonalizationRule = ({values, isSubmitting, submitForm, setFieldValue}) => {

    return (
        <section>
            {/*<Head>*/}
            {/*    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>*/}
            {/*</Head>*/}
            <div className="rule-atom rule-rule">
                <div className="input-field col l3 m6 s12">
                    <select>
                        <optgroup label="Parameters">
                            <option value="params.site_code">Site Code</option>
                            <option value="params.language">Language</option>
                            <option value="params.app_type">Application Type</option>
                        </optgroup>
                        <optgroup label="Profile">
                            <option value="data.profile.persona">Persona</option>
                            <option value="data.profile.homeCountry">Home Country</option>
                        </optgroup>
                    </select>
                    <label>Key</label>
                </div>
                <div className="input-field col l3 m6 s12">
                    <select>
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                    </select>
                    <label>Condition</label>
                </div>
                <div className="input-field col l3 m6 s12">
                    <select>
                        <option value="literal">Value</option>
                        <option value="variable">Variable</option>
                    </select>
                    <label>Value Type</label>
                </div>
                <div className="input-field col l3 m6 s12">
                    <input placeholder="" type="text" value="ab" className="validate"/>
                    <label htmlFor="first_name">Value</label>
                </div>

            </div>
            <style jsx>{`
        section {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        section > div {
          max-width: 800px;
        }
        .page-header {
          width: 100%;
          margin-left: -48px;
        }
        .form-container {
          max-width: 800px;
          width: 100%;
        }
        
        .rule-row {
                border: #26a69a 1px solid;
                padding-top: 7px;
                box-shadow: inset 0 1px 3px rgb(0 0 0 / 30%), 0 1px rgb(255 255 255 / 10%);
                border-radius: 10px;
                background: rgba(209, 249, 245, 0.1);
                margin: 5px 0px;
            }

            .rule-row > .row {
                margin-bottom: 0px;
            }

            .rule-row .rule-group {
                padding: 10px;
            }

            .rule-group {
                padding: 10px;
            }

            .rule-group-header .switch-field {
                width: 120px;
                max-width: 120px;
                float: left;
            }

            .rule-group-header .rule-group-buttons {
                margin-left: 135px;
                width: auto;
            }


            .rule-group-content {
                margin-left: 130px;
            }
            
            .switch-field {
                display: flex;
                margin-bottom: 36px;
                overflow: hidden;
            }

            .switch-field input {
                position: absolute !important;
                clip: rect(0, 0, 0, 0);
                height: 1px;
                width: 1px;
                border: 0;
                overflow: hidden;
            }

            .switch-field label {
                background-color: #e4e4e4;
                color: rgba(0, 0, 0, 0.6);
                font-size: 14px;
                line-height: 1;
                text-align: center;
                padding: 8px 16px;
                margin-right: -1px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
                transition: all 0.1s ease-in-out;
            }

            .switch-field label:hover {
                cursor: pointer;
            }

            .switch-field input:checked + label {
                background-color: #26a69a;
                color: #fff;
                box-shadow: none;
            }

            .switch-field label:first-of-type {
                border-radius: 4px 0 0 4px;
            }

            .switch-field label:last-of-type {
                border-radius: 0 4px 4px 0;
            }

            .background{
                color: #999999;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -100;
            }
      `}</style>
        </section>
    );
}

export default PersonalizationRule;