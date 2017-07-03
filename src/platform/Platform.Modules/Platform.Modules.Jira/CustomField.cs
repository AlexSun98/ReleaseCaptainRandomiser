using Platform.Modules.Jira.Remote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Platform.Modules.Jira
{
    public class CustomField : JiraNamedEntity
    {
        private readonly RemoteField _remoteField;

        /// <summary>
        /// Creates an instance of a CustomField from a remote field definition.
        /// </summary>
        public CustomField(RemoteField remoteField)
            : base(remoteField)
        {
            _remoteField = remoteField;
        }

        internal RemoteField RemoteField
        {
            get
            {
                return this._remoteField;
            }
        }

        public string CustomType
        {
            get
            {
                return _remoteField.CustomFieldType;
            }
        }
    }
}
