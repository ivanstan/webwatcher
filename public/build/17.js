webpackJsonp([17],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.js":
/*!********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.js ***!
  \********************************************************************************/
/*! exports provided: conf, language */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conf", function() { return conf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "language", function() { return language; });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var conf = {
    comments: {
        lineComment: '--',
        blockComment: ['/*', '*/'],
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
    ]
};
var language = {
    defaultToken: '',
    tokenPostfix: '.sql',
    ignoreCase: true,
    brackets: [
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    keywords: [
        "AES128", "AES256", "ALL", "ALLOWOVERWRITE", "ANALYSE", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "AUTHORIZATION",
        "BACKUP", "BETWEEN", "BINARY", "BLANKSASNULL", "BOTH", "BYTEDICT", "BZIP2", "CASE", "CAST", "CHECK", "COLLATE", "COLUMN",
        "CONSTRAINT", "CREATE", "CREDENTIALS", "CROSS", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER",
        "CURRENT_USER_ID", "DEFAULT", "DEFERRABLE", "DEFLATE", "DEFRAG", "DELTA", "DELTA32K", "DESC", "DISABLE", "DISTINCT", "DO",
        "ELSE", "EMPTYASNULL", "ENABLE", "ENCODE", "ENCRYPT", "ENCRYPTION", "END", "EXCEPT", "EXPLICIT", "FALSE", "FOR", "FOREIGN",
        "FREEZE", "FROM", "FULL", "GLOBALDICT256", "GLOBALDICT64K", "GRANT", "GROUP", "GZIP", "HAVING", "IDENTITY", "IGNORE", "ILIKE",
        "IN", "INITIALLY", "INNER", "INTERSECT", "INTO", "IS", "ISNULL", "JOIN", "LEADING", "LEFT", "LIKE", "LIMIT", "LOCALTIME",
        "LOCALTIMESTAMP", "LUN", "LUNS", "LZO", "LZOP", "MINUS", "MOSTLY13", "MOSTLY32", "MOSTLY8", "NATURAL", "NEW", "NOT", "NOTNULL",
        "NULL", "NULLS", "OFF", "OFFLINE", "OFFSET", "OID", "OLD", "ON", "ONLY", "OPEN", "OR", "ORDER", "OUTER", "OVERLAPS", "PARALLEL",
        "PARTITION", "PERCENT", "PERMISSIONS", "PLACING", "PRIMARY", "RAW", "READRATIO", "RECOVER", "REFERENCES", "RESPECT", "REJECTLOG",
        "RESORT", "RESTORE", "RIGHT", "SELECT", "SESSION_USER", "SIMILAR", "SNAPSHOT", "SOME", "SYSDATE", "SYSTEM", "TABLE", "TAG",
        "TDES", "TEXT255", "TEXT32K", "THEN", "TIMESTAMP", "TO", "TOP", "TRAILING", "TRUE", "TRUNCATECOLUMNS", "UNION", "UNIQUE", "USER",
        "USING", "VERBOSE", "WALLET", "WHEN", "WHERE", "WITH", "WITHOUT"
    ],
    operators: [
        "AND", "BETWEEN", "IN", "LIKE", "NOT", "OR", "IS", "NULL", "INTERSECT", "UNION", "INNER", "JOIN", "LEFT", "OUTER", "RIGHT"
    ],
    builtinFunctions: [
        "current_schema", "current_schemas", "has_database_privilege", "has_schema_privilege", "has_table_privilege", "age",
        "current_time", "current_timestamp", "localtime", "isfinite", "now", "ascii", "get_bit", "get_byte", "set_bit", "set_byte",
        "to_ascii", "approximate percentile_disc", "avg", "count", "listagg", "max", "median", "min", "percentile_cont", "stddev_samp",
        "stddev_pop", "sum", "var_samp", "var_pop", "bit_and", "bit_or", "bool_and", "bool_or", "cume_dist", "first_value", "lag",
        "last_value", "lead", "nth_value", "ratio_to_report", "dense_rank", "ntile", "percent_rank", "rank", "row_number", "case",
        "coalesce", "decode", "greatest", "least", "nvl", "nvl2", "nullif", "add_months", "at time zone", "convert_timezone",
        "current_date", "date_cmp", "date_cmp_timestamp", "date_cmp_timestamptz", "date_part_year", "dateadd", "datediff",
        "date_part", "date_trunc", "extract", "getdate", "interval_cmp", "last_day", "months_between", "next_day", "sysdate",
        "timeofday", "timestamp_cmp", "timestamp_cmp_date", "timestamp_cmp_timestamptz", "timestamptz_cmp", "timestamptz_cmp_date",
        "timestamptz_cmp_timestamp", "timezone", "to_timestamp", "trunc", "abs", "acos", "asin", "atan", "atan2", "cbrt", "ceil",
        "ceiling", "checksum", "cos", "cot", "degrees", "dexp", "dlog1", "dlog10", "exp", "floor", "ln", "log", "mod", "pi", "power",
        "radians", "random", "round", "sin", "sign", "sqrt", "tan", "to_hex", "bpcharcmp", "btrim", "bttext_pattern_cmp", "char_length",
        "character_length", "charindex", "chr", "concat", "crc32", "func_sha1", "initcap", "left and rights", "len", "length", "lower",
        "lpad and rpads", "ltrim", "md5", "octet_length", "position", "quote_ident", "quote_literal", "regexp_count", "regexp_instr",
        "regexp_replace", "regexp_substr", "repeat", "replace", "replicate", "reverse", "rtrim", "split_part", "strpos", "strtol",
        "substring", "textlen", "translate", "trim", "upper", "cast", "convert", "to_char", "to_date", "to_number", "json_array_length",
        "json_extract_array_element_text", "json_extract_path_text", "current_setting", "pg_cancel_backend", "pg_terminate_backend",
        "set_config", "current_database", "current_user", "current_user_id", "pg_backend_pid", "pg_last_copy_count", "pg_last_copy_id",
        "pg_last_query_id", "pg_last_unload_count", "session_user", "slice_num", "user", "version", "abbrev", "acosd", "any", "area",
        "array_agg", "array_append", "array_cat", "array_dims", "array_fill", "array_length", "array_lower", "array_ndims",
        "array_position", "array_positions", "array_prepend", "array_remove", "array_replace", "array_to_json", "array_to_string",
        "array_to_tsvector", "array_upper", "asind", "atan2d", "atand", "bit", "bit_length", "bound_box", "box",
        "brin_summarize_new_values", "broadcast", "cardinality", "center", "circle", "clock_timestamp", "col_description", "concat_ws",
        "convert_from", "convert_to", "corr", "cosd", "cotd", "covar_pop", "covar_samp", "current_catalog", "current_query",
        "current_role", "currval", "cursor_to_xml", "diameter", "div", "encode", "enum_first", "enum_last", "enum_range", "every",
        "family", "format", "format_type", "generate_series", "generate_subscripts", "get_current_ts_config", "gin_clean_pending_list",
        "grouping", "has_any_column_privilege", "has_column_privilege", "has_foreign_data_wrapper_privilege", "has_function_privilege",
        "has_language_privilege", "has_sequence_privilege", "has_server_privilege", "has_tablespace_privilege", "has_type_privilege",
        "height", "host", "hostmask", "inet_client_addr", "inet_client_port", "inet_merge", "inet_same_family", "inet_server_addr",
        "inet_server_port", "isclosed", "isempty", "isopen", "json_agg", "json_object", "json_object_agg", "json_populate_record",
        "json_populate_recordset", "json_to_record", "json_to_recordset", "jsonb_agg", "jsonb_object_agg", "justify_days", "justify_hours",
        "justify_interval", "lastval", "left", "line", "localtimestamp", "lower_inc", "lower_inf", "lpad", "lseg", "make_date",
        "make_interval", "make_time", "make_timestamp", "make_timestamptz", "masklen", "mode", "netmask", "network", "nextval", "npoints",
        "num_nonnulls", "num_nulls", "numnode", "obj_description", "overlay", "parse_ident", "path", "pclose", "percentile_disc",
        "pg_advisory_lock", "pg_advisory_lock_shared", "pg_advisory_unlock", "pg_advisory_unlock_all", "pg_advisory_unlock_shared",
        "pg_advisory_xact_lock", "pg_advisory_xact_lock_shared", "pg_backup_start_time", "pg_blocking_pids", "pg_client_encoding",
        "pg_collation_is_visible", "pg_column_size", "pg_conf_load_time", "pg_control_checkpoint", "pg_control_init", "pg_control_recovery",
        "pg_control_system", "pg_conversion_is_visible", "pg_create_logical_replication_slot", "pg_create_physical_replication_slot",
        "pg_create_restore_point", "pg_current_xlog_flush_location", "pg_current_xlog_insert_location", "pg_current_xlog_location",
        "pg_database_size", "pg_describe_object", "pg_drop_replication_slot", "pg_export_snapshot", "pg_filenode_relation",
        "pg_function_is_visible", "pg_get_constraintdef", "pg_get_expr", "pg_get_function_arguments", "pg_get_function_identity_arguments",
        "pg_get_function_result", "pg_get_functiondef", "pg_get_indexdef", "pg_get_keywords", "pg_get_object_address",
        "pg_get_owned_sequence", "pg_get_ruledef", "pg_get_serial_sequence", "pg_get_triggerdef", "pg_get_userbyid", "pg_get_viewdef",
        "pg_has_role", "pg_identify_object", "pg_identify_object_as_address", "pg_index_column_has_property", "pg_index_has_property",
        "pg_indexam_has_property", "pg_indexes_size", "pg_is_in_backup", "pg_is_in_recovery", "pg_is_other_temp_schema",
        "pg_is_xlog_replay_paused", "pg_last_committed_xact", "pg_last_xact_replay_timestamp", "pg_last_xlog_receive_location",
        "pg_last_xlog_replay_location", "pg_listening_channels", "pg_logical_emit_message", "pg_logical_slot_get_binary_changes",
        "pg_logical_slot_get_changes", "pg_logical_slot_peek_binary_changes", "pg_logical_slot_peek_changes", "pg_ls_dir",
        "pg_my_temp_schema", "pg_notification_queue_usage", "pg_opclass_is_visible", "pg_operator_is_visible", "pg_opfamily_is_visible",
        "pg_options_to_table", "pg_postmaster_start_time", "pg_read_binary_file", "pg_read_file", "pg_relation_filenode",
        "pg_relation_filepath", "pg_relation_size", "pg_reload_conf", "pg_replication_origin_create", "pg_replication_origin_drop",
        "pg_replication_origin_oid", "pg_replication_origin_progress", "pg_replication_origin_session_is_setup",
        "pg_replication_origin_session_progress", "pg_replication_origin_session_reset", "pg_replication_origin_session_setup",
        "pg_replication_origin_xact_reset", "pg_replication_origin_xact_setup", "pg_rotate_logfile", "pg_size_bytes", "pg_size_pretty",
        "pg_sleep", "pg_sleep_for", "pg_sleep_until", "pg_start_backup", "pg_stat_file", "pg_stop_backup", "pg_switch_xlog",
        "pg_table_is_visible", "pg_table_size", "pg_tablespace_databases", "pg_tablespace_location", "pg_tablespace_size",
        "pg_total_relation_size", "pg_trigger_depth", "pg_try_advisory_lock", "pg_try_advisory_lock_shared", "pg_try_advisory_xact_lock",
        "pg_try_advisory_xact_lock_shared", "pg_ts_config_is_visible", "pg_ts_dict_is_visible", "pg_ts_parser_is_visible",
        "pg_ts_template_is_visible", "pg_type_is_visible", "pg_typeof", "pg_xact_commit_timestamp", "pg_xlog_location_diff",
        "pg_xlog_replay_pause", "pg_xlog_replay_resume", "pg_xlogfile_name", "pg_xlogfile_name_offset", "phraseto_tsquery",
        "plainto_tsquery", "point", "polygon", "popen", "pqserverversion", "query_to_xml", "querytree", "quote_nullable", "radius",
        "range_merge", "regexp_matches", "regexp_split_to_array", "regexp_split_to_table", "regr_avgx", "regr_avgy", "regr_count",
        "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "right", "row_security_active", "row_to_json",
        "rpad", "scale", "set_masklen", "setseed", "setval", "setweight", "shobj_description", "sind", "sprintf", "statement_timestamp",
        "stddev", "string_agg", "string_to_array", "strip", "substr", "table_to_xml", "table_to_xml_and_xmlschema", "tand", "text",
        "to_json", "to_regclass", "to_regnamespace", "to_regoper", "to_regoperator", "to_regproc", "to_regprocedure", "to_regrole",
        "to_regtype", "to_tsquery", "to_tsvector", "transaction_timestamp", "ts_debug", "ts_delete", "ts_filter", "ts_headline",
        "ts_lexize", "ts_parse", "ts_rank", "ts_rank_cd", "ts_rewrite", "ts_stat", "ts_token_type", "tsquery_phrase", "tsvector_to_array",
        "tsvector_update_trigger", "tsvector_update_trigger_column", "txid_current", "txid_current_snapshot", "txid_snapshot_xip",
        "txid_snapshot_xmax", "txid_snapshot_xmin", "txid_visible_in_snapshot", "unnest", "upper_inc", "upper_inf", "variance", "width",
        "width_bucket", "xml_is_well_formed", "xml_is_well_formed_content", "xml_is_well_formed_document", "xmlagg", "xmlcomment",
        "xmlconcat", "xmlelement", "xmlexists", "xmlforest", "xmlparse", "xmlpi", "xmlroot", "xmlserialize", "xpath", "xpath_exists"
    ],
    builtinVariables: [],
    pseudoColumns: [],
    tokenizer: {
        root: [
            { include: '@comments' },
            { include: '@whitespace' },
            { include: '@pseudoColumns' },
            { include: '@numbers' },
            { include: '@strings' },
            { include: '@complexIdentifiers' },
            { include: '@scopes' },
            [/[;,.]/, 'delimiter'],
            [/[()]/, '@brackets'],
            [/[\w@#$]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@operators': 'operator',
                        '@builtinVariables': 'predefined',
                        '@builtinFunctions': 'predefined',
                        '@default': 'identifier'
                    }
                }],
            [/[<>=!%&+\-*/|~^]/, 'operator'],
        ],
        whitespace: [
            [/\s+/, 'white']
        ],
        comments: [
            [/--+.*/, 'comment'],
            [/\/\*/, { token: 'comment.quote', next: '@comment' }]
        ],
        comment: [
            [/[^*/]+/, 'comment'],
            // Not supporting nested comments, as nested comments seem to not be standard?
            // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
            // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
            [/\*\//, { token: 'comment.quote', next: '@pop' }],
            [/./, 'comment']
        ],
        pseudoColumns: [
            [/[$][A-Za-z_][\w@#$]*/, {
                    cases: {
                        '@pseudoColumns': 'predefined',
                        '@default': 'identifier'
                    }
                }],
        ],
        numbers: [
            [/0[xX][0-9a-fA-F]*/, 'number'],
            [/[$][+-]*\d*(\.\d*)?/, 'number'],
            [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
        ],
        strings: [
            [/'/, { token: 'string', next: '@string' }],
        ],
        string: [
            [/[^']+/, 'string'],
            [/''/, 'string'],
            [/'/, { token: 'string', next: '@pop' }]
        ],
        complexIdentifiers: [
            [/"/, { token: 'identifier.quote', next: '@quotedIdentifier' }]
        ],
        quotedIdentifier: [
            [/[^"]+/, 'identifier'],
            [/""/, 'identifier'],
            [/"/, { token: 'identifier.quote', next: '@pop' }]
        ],
        scopes: []
    }
};


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3JlZHNoaWZ0L3JlZHNoaWZ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBLFNBQVMsU0FBUyxZQUFZLEdBQUc7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG1EQUFtRDtBQUM1RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLGlDQUFpQztBQUM5QyxhQUFhLHFCQUFxQjtBQUNsQyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJDQUEyQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHdDQUF3QztBQUNqRSxzQkFBc0IsdUNBQXVDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0EsbUJBQW1CLHVEQUF1RDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwQ0FBMEM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy0tJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXSxcbiAgICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnIH0sXG4gICAgXVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnJyxcbiAgICB0b2tlblBvc3RmaXg6ICcuc3FsJyxcbiAgICBpZ25vcmVDYXNlOiB0cnVlLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCB0b2tlbjogJ2RlbGltaXRlci5zcXVhcmUnIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycgfVxuICAgIF0sXG4gICAga2V5d29yZHM6IFtcbiAgICAgICAgXCJBRVMxMjhcIiwgXCJBRVMyNTZcIiwgXCJBTExcIiwgXCJBTExPV09WRVJXUklURVwiLCBcIkFOQUxZU0VcIiwgXCJBTkFMWVpFXCIsIFwiQU5EXCIsIFwiQU5ZXCIsIFwiQVJSQVlcIiwgXCJBU1wiLCBcIkFTQ1wiLCBcIkFVVEhPUklaQVRJT05cIixcbiAgICAgICAgXCJCQUNLVVBcIiwgXCJCRVRXRUVOXCIsIFwiQklOQVJZXCIsIFwiQkxBTktTQVNOVUxMXCIsIFwiQk9USFwiLCBcIkJZVEVESUNUXCIsIFwiQlpJUDJcIiwgXCJDQVNFXCIsIFwiQ0FTVFwiLCBcIkNIRUNLXCIsIFwiQ09MTEFURVwiLCBcIkNPTFVNTlwiLFxuICAgICAgICBcIkNPTlNUUkFJTlRcIiwgXCJDUkVBVEVcIiwgXCJDUkVERU5USUFMU1wiLCBcIkNST1NTXCIsIFwiQ1VSUkVOVF9EQVRFXCIsIFwiQ1VSUkVOVF9USU1FXCIsIFwiQ1VSUkVOVF9USU1FU1RBTVBcIiwgXCJDVVJSRU5UX1VTRVJcIixcbiAgICAgICAgXCJDVVJSRU5UX1VTRVJfSURcIiwgXCJERUZBVUxUXCIsIFwiREVGRVJSQUJMRVwiLCBcIkRFRkxBVEVcIiwgXCJERUZSQUdcIiwgXCJERUxUQVwiLCBcIkRFTFRBMzJLXCIsIFwiREVTQ1wiLCBcIkRJU0FCTEVcIiwgXCJESVNUSU5DVFwiLCBcIkRPXCIsXG4gICAgICAgIFwiRUxTRVwiLCBcIkVNUFRZQVNOVUxMXCIsIFwiRU5BQkxFXCIsIFwiRU5DT0RFXCIsIFwiRU5DUllQVFwiLCBcIkVOQ1JZUFRJT05cIiwgXCJFTkRcIiwgXCJFWENFUFRcIiwgXCJFWFBMSUNJVFwiLCBcIkZBTFNFXCIsIFwiRk9SXCIsIFwiRk9SRUlHTlwiLFxuICAgICAgICBcIkZSRUVaRVwiLCBcIkZST01cIiwgXCJGVUxMXCIsIFwiR0xPQkFMRElDVDI1NlwiLCBcIkdMT0JBTERJQ1Q2NEtcIiwgXCJHUkFOVFwiLCBcIkdST1VQXCIsIFwiR1pJUFwiLCBcIkhBVklOR1wiLCBcIklERU5USVRZXCIsIFwiSUdOT1JFXCIsIFwiSUxJS0VcIixcbiAgICAgICAgXCJJTlwiLCBcIklOSVRJQUxMWVwiLCBcIklOTkVSXCIsIFwiSU5URVJTRUNUXCIsIFwiSU5UT1wiLCBcIklTXCIsIFwiSVNOVUxMXCIsIFwiSk9JTlwiLCBcIkxFQURJTkdcIiwgXCJMRUZUXCIsIFwiTElLRVwiLCBcIkxJTUlUXCIsIFwiTE9DQUxUSU1FXCIsXG4gICAgICAgIFwiTE9DQUxUSU1FU1RBTVBcIiwgXCJMVU5cIiwgXCJMVU5TXCIsIFwiTFpPXCIsIFwiTFpPUFwiLCBcIk1JTlVTXCIsIFwiTU9TVExZMTNcIiwgXCJNT1NUTFkzMlwiLCBcIk1PU1RMWThcIiwgXCJOQVRVUkFMXCIsIFwiTkVXXCIsIFwiTk9UXCIsIFwiTk9UTlVMTFwiLFxuICAgICAgICBcIk5VTExcIiwgXCJOVUxMU1wiLCBcIk9GRlwiLCBcIk9GRkxJTkVcIiwgXCJPRkZTRVRcIiwgXCJPSURcIiwgXCJPTERcIiwgXCJPTlwiLCBcIk9OTFlcIiwgXCJPUEVOXCIsIFwiT1JcIiwgXCJPUkRFUlwiLCBcIk9VVEVSXCIsIFwiT1ZFUkxBUFNcIiwgXCJQQVJBTExFTFwiLFxuICAgICAgICBcIlBBUlRJVElPTlwiLCBcIlBFUkNFTlRcIiwgXCJQRVJNSVNTSU9OU1wiLCBcIlBMQUNJTkdcIiwgXCJQUklNQVJZXCIsIFwiUkFXXCIsIFwiUkVBRFJBVElPXCIsIFwiUkVDT1ZFUlwiLCBcIlJFRkVSRU5DRVNcIiwgXCJSRVNQRUNUXCIsIFwiUkVKRUNUTE9HXCIsXG4gICAgICAgIFwiUkVTT1JUXCIsIFwiUkVTVE9SRVwiLCBcIlJJR0hUXCIsIFwiU0VMRUNUXCIsIFwiU0VTU0lPTl9VU0VSXCIsIFwiU0lNSUxBUlwiLCBcIlNOQVBTSE9UXCIsIFwiU09NRVwiLCBcIlNZU0RBVEVcIiwgXCJTWVNURU1cIiwgXCJUQUJMRVwiLCBcIlRBR1wiLFxuICAgICAgICBcIlRERVNcIiwgXCJURVhUMjU1XCIsIFwiVEVYVDMyS1wiLCBcIlRIRU5cIiwgXCJUSU1FU1RBTVBcIiwgXCJUT1wiLCBcIlRPUFwiLCBcIlRSQUlMSU5HXCIsIFwiVFJVRVwiLCBcIlRSVU5DQVRFQ09MVU1OU1wiLCBcIlVOSU9OXCIsIFwiVU5JUVVFXCIsIFwiVVNFUlwiLFxuICAgICAgICBcIlVTSU5HXCIsIFwiVkVSQk9TRVwiLCBcIldBTExFVFwiLCBcIldIRU5cIiwgXCJXSEVSRVwiLCBcIldJVEhcIiwgXCJXSVRIT1VUXCJcbiAgICBdLFxuICAgIG9wZXJhdG9yczogW1xuICAgICAgICBcIkFORFwiLCBcIkJFVFdFRU5cIiwgXCJJTlwiLCBcIkxJS0VcIiwgXCJOT1RcIiwgXCJPUlwiLCBcIklTXCIsIFwiTlVMTFwiLCBcIklOVEVSU0VDVFwiLCBcIlVOSU9OXCIsIFwiSU5ORVJcIiwgXCJKT0lOXCIsIFwiTEVGVFwiLCBcIk9VVEVSXCIsIFwiUklHSFRcIlxuICAgIF0sXG4gICAgYnVpbHRpbkZ1bmN0aW9uczogW1xuICAgICAgICBcImN1cnJlbnRfc2NoZW1hXCIsIFwiY3VycmVudF9zY2hlbWFzXCIsIFwiaGFzX2RhdGFiYXNlX3ByaXZpbGVnZVwiLCBcImhhc19zY2hlbWFfcHJpdmlsZWdlXCIsIFwiaGFzX3RhYmxlX3ByaXZpbGVnZVwiLCBcImFnZVwiLFxuICAgICAgICBcImN1cnJlbnRfdGltZVwiLCBcImN1cnJlbnRfdGltZXN0YW1wXCIsIFwibG9jYWx0aW1lXCIsIFwiaXNmaW5pdGVcIiwgXCJub3dcIiwgXCJhc2NpaVwiLCBcImdldF9iaXRcIiwgXCJnZXRfYnl0ZVwiLCBcInNldF9iaXRcIiwgXCJzZXRfYnl0ZVwiLFxuICAgICAgICBcInRvX2FzY2lpXCIsIFwiYXBwcm94aW1hdGUgcGVyY2VudGlsZV9kaXNjXCIsIFwiYXZnXCIsIFwiY291bnRcIiwgXCJsaXN0YWdnXCIsIFwibWF4XCIsIFwibWVkaWFuXCIsIFwibWluXCIsIFwicGVyY2VudGlsZV9jb250XCIsIFwic3RkZGV2X3NhbXBcIixcbiAgICAgICAgXCJzdGRkZXZfcG9wXCIsIFwic3VtXCIsIFwidmFyX3NhbXBcIiwgXCJ2YXJfcG9wXCIsIFwiYml0X2FuZFwiLCBcImJpdF9vclwiLCBcImJvb2xfYW5kXCIsIFwiYm9vbF9vclwiLCBcImN1bWVfZGlzdFwiLCBcImZpcnN0X3ZhbHVlXCIsIFwibGFnXCIsXG4gICAgICAgIFwibGFzdF92YWx1ZVwiLCBcImxlYWRcIiwgXCJudGhfdmFsdWVcIiwgXCJyYXRpb190b19yZXBvcnRcIiwgXCJkZW5zZV9yYW5rXCIsIFwibnRpbGVcIiwgXCJwZXJjZW50X3JhbmtcIiwgXCJyYW5rXCIsIFwicm93X251bWJlclwiLCBcImNhc2VcIixcbiAgICAgICAgXCJjb2FsZXNjZVwiLCBcImRlY29kZVwiLCBcImdyZWF0ZXN0XCIsIFwibGVhc3RcIiwgXCJudmxcIiwgXCJudmwyXCIsIFwibnVsbGlmXCIsIFwiYWRkX21vbnRoc1wiLCBcImF0IHRpbWUgem9uZVwiLCBcImNvbnZlcnRfdGltZXpvbmVcIixcbiAgICAgICAgXCJjdXJyZW50X2RhdGVcIiwgXCJkYXRlX2NtcFwiLCBcImRhdGVfY21wX3RpbWVzdGFtcFwiLCBcImRhdGVfY21wX3RpbWVzdGFtcHR6XCIsIFwiZGF0ZV9wYXJ0X3llYXJcIiwgXCJkYXRlYWRkXCIsIFwiZGF0ZWRpZmZcIixcbiAgICAgICAgXCJkYXRlX3BhcnRcIiwgXCJkYXRlX3RydW5jXCIsIFwiZXh0cmFjdFwiLCBcImdldGRhdGVcIiwgXCJpbnRlcnZhbF9jbXBcIiwgXCJsYXN0X2RheVwiLCBcIm1vbnRoc19iZXR3ZWVuXCIsIFwibmV4dF9kYXlcIiwgXCJzeXNkYXRlXCIsXG4gICAgICAgIFwidGltZW9mZGF5XCIsIFwidGltZXN0YW1wX2NtcFwiLCBcInRpbWVzdGFtcF9jbXBfZGF0ZVwiLCBcInRpbWVzdGFtcF9jbXBfdGltZXN0YW1wdHpcIiwgXCJ0aW1lc3RhbXB0el9jbXBcIiwgXCJ0aW1lc3RhbXB0el9jbXBfZGF0ZVwiLFxuICAgICAgICBcInRpbWVzdGFtcHR6X2NtcF90aW1lc3RhbXBcIiwgXCJ0aW1lem9uZVwiLCBcInRvX3RpbWVzdGFtcFwiLCBcInRydW5jXCIsIFwiYWJzXCIsIFwiYWNvc1wiLCBcImFzaW5cIiwgXCJhdGFuXCIsIFwiYXRhbjJcIiwgXCJjYnJ0XCIsIFwiY2VpbFwiLFxuICAgICAgICBcImNlaWxpbmdcIiwgXCJjaGVja3N1bVwiLCBcImNvc1wiLCBcImNvdFwiLCBcImRlZ3JlZXNcIiwgXCJkZXhwXCIsIFwiZGxvZzFcIiwgXCJkbG9nMTBcIiwgXCJleHBcIiwgXCJmbG9vclwiLCBcImxuXCIsIFwibG9nXCIsIFwibW9kXCIsIFwicGlcIiwgXCJwb3dlclwiLFxuICAgICAgICBcInJhZGlhbnNcIiwgXCJyYW5kb21cIiwgXCJyb3VuZFwiLCBcInNpblwiLCBcInNpZ25cIiwgXCJzcXJ0XCIsIFwidGFuXCIsIFwidG9faGV4XCIsIFwiYnBjaGFyY21wXCIsIFwiYnRyaW1cIiwgXCJidHRleHRfcGF0dGVybl9jbXBcIiwgXCJjaGFyX2xlbmd0aFwiLFxuICAgICAgICBcImNoYXJhY3Rlcl9sZW5ndGhcIiwgXCJjaGFyaW5kZXhcIiwgXCJjaHJcIiwgXCJjb25jYXRcIiwgXCJjcmMzMlwiLCBcImZ1bmNfc2hhMVwiLCBcImluaXRjYXBcIiwgXCJsZWZ0IGFuZCByaWdodHNcIiwgXCJsZW5cIiwgXCJsZW5ndGhcIiwgXCJsb3dlclwiLFxuICAgICAgICBcImxwYWQgYW5kIHJwYWRzXCIsIFwibHRyaW1cIiwgXCJtZDVcIiwgXCJvY3RldF9sZW5ndGhcIiwgXCJwb3NpdGlvblwiLCBcInF1b3RlX2lkZW50XCIsIFwicXVvdGVfbGl0ZXJhbFwiLCBcInJlZ2V4cF9jb3VudFwiLCBcInJlZ2V4cF9pbnN0clwiLFxuICAgICAgICBcInJlZ2V4cF9yZXBsYWNlXCIsIFwicmVnZXhwX3N1YnN0clwiLCBcInJlcGVhdFwiLCBcInJlcGxhY2VcIiwgXCJyZXBsaWNhdGVcIiwgXCJyZXZlcnNlXCIsIFwicnRyaW1cIiwgXCJzcGxpdF9wYXJ0XCIsIFwic3RycG9zXCIsIFwic3RydG9sXCIsXG4gICAgICAgIFwic3Vic3RyaW5nXCIsIFwidGV4dGxlblwiLCBcInRyYW5zbGF0ZVwiLCBcInRyaW1cIiwgXCJ1cHBlclwiLCBcImNhc3RcIiwgXCJjb252ZXJ0XCIsIFwidG9fY2hhclwiLCBcInRvX2RhdGVcIiwgXCJ0b19udW1iZXJcIiwgXCJqc29uX2FycmF5X2xlbmd0aFwiLFxuICAgICAgICBcImpzb25fZXh0cmFjdF9hcnJheV9lbGVtZW50X3RleHRcIiwgXCJqc29uX2V4dHJhY3RfcGF0aF90ZXh0XCIsIFwiY3VycmVudF9zZXR0aW5nXCIsIFwicGdfY2FuY2VsX2JhY2tlbmRcIiwgXCJwZ190ZXJtaW5hdGVfYmFja2VuZFwiLFxuICAgICAgICBcInNldF9jb25maWdcIiwgXCJjdXJyZW50X2RhdGFiYXNlXCIsIFwiY3VycmVudF91c2VyXCIsIFwiY3VycmVudF91c2VyX2lkXCIsIFwicGdfYmFja2VuZF9waWRcIiwgXCJwZ19sYXN0X2NvcHlfY291bnRcIiwgXCJwZ19sYXN0X2NvcHlfaWRcIixcbiAgICAgICAgXCJwZ19sYXN0X3F1ZXJ5X2lkXCIsIFwicGdfbGFzdF91bmxvYWRfY291bnRcIiwgXCJzZXNzaW9uX3VzZXJcIiwgXCJzbGljZV9udW1cIiwgXCJ1c2VyXCIsIFwidmVyc2lvblwiLCBcImFiYnJldlwiLCBcImFjb3NkXCIsIFwiYW55XCIsIFwiYXJlYVwiLFxuICAgICAgICBcImFycmF5X2FnZ1wiLCBcImFycmF5X2FwcGVuZFwiLCBcImFycmF5X2NhdFwiLCBcImFycmF5X2RpbXNcIiwgXCJhcnJheV9maWxsXCIsIFwiYXJyYXlfbGVuZ3RoXCIsIFwiYXJyYXlfbG93ZXJcIiwgXCJhcnJheV9uZGltc1wiLFxuICAgICAgICBcImFycmF5X3Bvc2l0aW9uXCIsIFwiYXJyYXlfcG9zaXRpb25zXCIsIFwiYXJyYXlfcHJlcGVuZFwiLCBcImFycmF5X3JlbW92ZVwiLCBcImFycmF5X3JlcGxhY2VcIiwgXCJhcnJheV90b19qc29uXCIsIFwiYXJyYXlfdG9fc3RyaW5nXCIsXG4gICAgICAgIFwiYXJyYXlfdG9fdHN2ZWN0b3JcIiwgXCJhcnJheV91cHBlclwiLCBcImFzaW5kXCIsIFwiYXRhbjJkXCIsIFwiYXRhbmRcIiwgXCJiaXRcIiwgXCJiaXRfbGVuZ3RoXCIsIFwiYm91bmRfYm94XCIsIFwiYm94XCIsXG4gICAgICAgIFwiYnJpbl9zdW1tYXJpemVfbmV3X3ZhbHVlc1wiLCBcImJyb2FkY2FzdFwiLCBcImNhcmRpbmFsaXR5XCIsIFwiY2VudGVyXCIsIFwiY2lyY2xlXCIsIFwiY2xvY2tfdGltZXN0YW1wXCIsIFwiY29sX2Rlc2NyaXB0aW9uXCIsIFwiY29uY2F0X3dzXCIsXG4gICAgICAgIFwiY29udmVydF9mcm9tXCIsIFwiY29udmVydF90b1wiLCBcImNvcnJcIiwgXCJjb3NkXCIsIFwiY290ZFwiLCBcImNvdmFyX3BvcFwiLCBcImNvdmFyX3NhbXBcIiwgXCJjdXJyZW50X2NhdGFsb2dcIiwgXCJjdXJyZW50X3F1ZXJ5XCIsXG4gICAgICAgIFwiY3VycmVudF9yb2xlXCIsIFwiY3VycnZhbFwiLCBcImN1cnNvcl90b194bWxcIiwgXCJkaWFtZXRlclwiLCBcImRpdlwiLCBcImVuY29kZVwiLCBcImVudW1fZmlyc3RcIiwgXCJlbnVtX2xhc3RcIiwgXCJlbnVtX3JhbmdlXCIsIFwiZXZlcnlcIixcbiAgICAgICAgXCJmYW1pbHlcIiwgXCJmb3JtYXRcIiwgXCJmb3JtYXRfdHlwZVwiLCBcImdlbmVyYXRlX3Nlcmllc1wiLCBcImdlbmVyYXRlX3N1YnNjcmlwdHNcIiwgXCJnZXRfY3VycmVudF90c19jb25maWdcIiwgXCJnaW5fY2xlYW5fcGVuZGluZ19saXN0XCIsXG4gICAgICAgIFwiZ3JvdXBpbmdcIiwgXCJoYXNfYW55X2NvbHVtbl9wcml2aWxlZ2VcIiwgXCJoYXNfY29sdW1uX3ByaXZpbGVnZVwiLCBcImhhc19mb3JlaWduX2RhdGFfd3JhcHBlcl9wcml2aWxlZ2VcIiwgXCJoYXNfZnVuY3Rpb25fcHJpdmlsZWdlXCIsXG4gICAgICAgIFwiaGFzX2xhbmd1YWdlX3ByaXZpbGVnZVwiLCBcImhhc19zZXF1ZW5jZV9wcml2aWxlZ2VcIiwgXCJoYXNfc2VydmVyX3ByaXZpbGVnZVwiLCBcImhhc190YWJsZXNwYWNlX3ByaXZpbGVnZVwiLCBcImhhc190eXBlX3ByaXZpbGVnZVwiLFxuICAgICAgICBcImhlaWdodFwiLCBcImhvc3RcIiwgXCJob3N0bWFza1wiLCBcImluZXRfY2xpZW50X2FkZHJcIiwgXCJpbmV0X2NsaWVudF9wb3J0XCIsIFwiaW5ldF9tZXJnZVwiLCBcImluZXRfc2FtZV9mYW1pbHlcIiwgXCJpbmV0X3NlcnZlcl9hZGRyXCIsXG4gICAgICAgIFwiaW5ldF9zZXJ2ZXJfcG9ydFwiLCBcImlzY2xvc2VkXCIsIFwiaXNlbXB0eVwiLCBcImlzb3BlblwiLCBcImpzb25fYWdnXCIsIFwianNvbl9vYmplY3RcIiwgXCJqc29uX29iamVjdF9hZ2dcIiwgXCJqc29uX3BvcHVsYXRlX3JlY29yZFwiLFxuICAgICAgICBcImpzb25fcG9wdWxhdGVfcmVjb3Jkc2V0XCIsIFwianNvbl90b19yZWNvcmRcIiwgXCJqc29uX3RvX3JlY29yZHNldFwiLCBcImpzb25iX2FnZ1wiLCBcImpzb25iX29iamVjdF9hZ2dcIiwgXCJqdXN0aWZ5X2RheXNcIiwgXCJqdXN0aWZ5X2hvdXJzXCIsXG4gICAgICAgIFwianVzdGlmeV9pbnRlcnZhbFwiLCBcImxhc3R2YWxcIiwgXCJsZWZ0XCIsIFwibGluZVwiLCBcImxvY2FsdGltZXN0YW1wXCIsIFwibG93ZXJfaW5jXCIsIFwibG93ZXJfaW5mXCIsIFwibHBhZFwiLCBcImxzZWdcIiwgXCJtYWtlX2RhdGVcIixcbiAgICAgICAgXCJtYWtlX2ludGVydmFsXCIsIFwibWFrZV90aW1lXCIsIFwibWFrZV90aW1lc3RhbXBcIiwgXCJtYWtlX3RpbWVzdGFtcHR6XCIsIFwibWFza2xlblwiLCBcIm1vZGVcIiwgXCJuZXRtYXNrXCIsIFwibmV0d29ya1wiLCBcIm5leHR2YWxcIiwgXCJucG9pbnRzXCIsXG4gICAgICAgIFwibnVtX25vbm51bGxzXCIsIFwibnVtX251bGxzXCIsIFwibnVtbm9kZVwiLCBcIm9ial9kZXNjcmlwdGlvblwiLCBcIm92ZXJsYXlcIiwgXCJwYXJzZV9pZGVudFwiLCBcInBhdGhcIiwgXCJwY2xvc2VcIiwgXCJwZXJjZW50aWxlX2Rpc2NcIixcbiAgICAgICAgXCJwZ19hZHZpc29yeV9sb2NrXCIsIFwicGdfYWR2aXNvcnlfbG9ja19zaGFyZWRcIiwgXCJwZ19hZHZpc29yeV91bmxvY2tcIiwgXCJwZ19hZHZpc29yeV91bmxvY2tfYWxsXCIsIFwicGdfYWR2aXNvcnlfdW5sb2NrX3NoYXJlZFwiLFxuICAgICAgICBcInBnX2Fkdmlzb3J5X3hhY3RfbG9ja1wiLCBcInBnX2Fkdmlzb3J5X3hhY3RfbG9ja19zaGFyZWRcIiwgXCJwZ19iYWNrdXBfc3RhcnRfdGltZVwiLCBcInBnX2Jsb2NraW5nX3BpZHNcIiwgXCJwZ19jbGllbnRfZW5jb2RpbmdcIixcbiAgICAgICAgXCJwZ19jb2xsYXRpb25faXNfdmlzaWJsZVwiLCBcInBnX2NvbHVtbl9zaXplXCIsIFwicGdfY29uZl9sb2FkX3RpbWVcIiwgXCJwZ19jb250cm9sX2NoZWNrcG9pbnRcIiwgXCJwZ19jb250cm9sX2luaXRcIiwgXCJwZ19jb250cm9sX3JlY292ZXJ5XCIsXG4gICAgICAgIFwicGdfY29udHJvbF9zeXN0ZW1cIiwgXCJwZ19jb252ZXJzaW9uX2lzX3Zpc2libGVcIiwgXCJwZ19jcmVhdGVfbG9naWNhbF9yZXBsaWNhdGlvbl9zbG90XCIsIFwicGdfY3JlYXRlX3BoeXNpY2FsX3JlcGxpY2F0aW9uX3Nsb3RcIixcbiAgICAgICAgXCJwZ19jcmVhdGVfcmVzdG9yZV9wb2ludFwiLCBcInBnX2N1cnJlbnRfeGxvZ19mbHVzaF9sb2NhdGlvblwiLCBcInBnX2N1cnJlbnRfeGxvZ19pbnNlcnRfbG9jYXRpb25cIiwgXCJwZ19jdXJyZW50X3hsb2dfbG9jYXRpb25cIixcbiAgICAgICAgXCJwZ19kYXRhYmFzZV9zaXplXCIsIFwicGdfZGVzY3JpYmVfb2JqZWN0XCIsIFwicGdfZHJvcF9yZXBsaWNhdGlvbl9zbG90XCIsIFwicGdfZXhwb3J0X3NuYXBzaG90XCIsIFwicGdfZmlsZW5vZGVfcmVsYXRpb25cIixcbiAgICAgICAgXCJwZ19mdW5jdGlvbl9pc192aXNpYmxlXCIsIFwicGdfZ2V0X2NvbnN0cmFpbnRkZWZcIiwgXCJwZ19nZXRfZXhwclwiLCBcInBnX2dldF9mdW5jdGlvbl9hcmd1bWVudHNcIiwgXCJwZ19nZXRfZnVuY3Rpb25faWRlbnRpdHlfYXJndW1lbnRzXCIsXG4gICAgICAgIFwicGdfZ2V0X2Z1bmN0aW9uX3Jlc3VsdFwiLCBcInBnX2dldF9mdW5jdGlvbmRlZlwiLCBcInBnX2dldF9pbmRleGRlZlwiLCBcInBnX2dldF9rZXl3b3Jkc1wiLCBcInBnX2dldF9vYmplY3RfYWRkcmVzc1wiLFxuICAgICAgICBcInBnX2dldF9vd25lZF9zZXF1ZW5jZVwiLCBcInBnX2dldF9ydWxlZGVmXCIsIFwicGdfZ2V0X3NlcmlhbF9zZXF1ZW5jZVwiLCBcInBnX2dldF90cmlnZ2VyZGVmXCIsIFwicGdfZ2V0X3VzZXJieWlkXCIsIFwicGdfZ2V0X3ZpZXdkZWZcIixcbiAgICAgICAgXCJwZ19oYXNfcm9sZVwiLCBcInBnX2lkZW50aWZ5X29iamVjdFwiLCBcInBnX2lkZW50aWZ5X29iamVjdF9hc19hZGRyZXNzXCIsIFwicGdfaW5kZXhfY29sdW1uX2hhc19wcm9wZXJ0eVwiLCBcInBnX2luZGV4X2hhc19wcm9wZXJ0eVwiLFxuICAgICAgICBcInBnX2luZGV4YW1faGFzX3Byb3BlcnR5XCIsIFwicGdfaW5kZXhlc19zaXplXCIsIFwicGdfaXNfaW5fYmFja3VwXCIsIFwicGdfaXNfaW5fcmVjb3ZlcnlcIiwgXCJwZ19pc19vdGhlcl90ZW1wX3NjaGVtYVwiLFxuICAgICAgICBcInBnX2lzX3hsb2dfcmVwbGF5X3BhdXNlZFwiLCBcInBnX2xhc3RfY29tbWl0dGVkX3hhY3RcIiwgXCJwZ19sYXN0X3hhY3RfcmVwbGF5X3RpbWVzdGFtcFwiLCBcInBnX2xhc3RfeGxvZ19yZWNlaXZlX2xvY2F0aW9uXCIsXG4gICAgICAgIFwicGdfbGFzdF94bG9nX3JlcGxheV9sb2NhdGlvblwiLCBcInBnX2xpc3RlbmluZ19jaGFubmVsc1wiLCBcInBnX2xvZ2ljYWxfZW1pdF9tZXNzYWdlXCIsIFwicGdfbG9naWNhbF9zbG90X2dldF9iaW5hcnlfY2hhbmdlc1wiLFxuICAgICAgICBcInBnX2xvZ2ljYWxfc2xvdF9nZXRfY2hhbmdlc1wiLCBcInBnX2xvZ2ljYWxfc2xvdF9wZWVrX2JpbmFyeV9jaGFuZ2VzXCIsIFwicGdfbG9naWNhbF9zbG90X3BlZWtfY2hhbmdlc1wiLCBcInBnX2xzX2RpclwiLFxuICAgICAgICBcInBnX215X3RlbXBfc2NoZW1hXCIsIFwicGdfbm90aWZpY2F0aW9uX3F1ZXVlX3VzYWdlXCIsIFwicGdfb3BjbGFzc19pc192aXNpYmxlXCIsIFwicGdfb3BlcmF0b3JfaXNfdmlzaWJsZVwiLCBcInBnX29wZmFtaWx5X2lzX3Zpc2libGVcIixcbiAgICAgICAgXCJwZ19vcHRpb25zX3RvX3RhYmxlXCIsIFwicGdfcG9zdG1hc3Rlcl9zdGFydF90aW1lXCIsIFwicGdfcmVhZF9iaW5hcnlfZmlsZVwiLCBcInBnX3JlYWRfZmlsZVwiLCBcInBnX3JlbGF0aW9uX2ZpbGVub2RlXCIsXG4gICAgICAgIFwicGdfcmVsYXRpb25fZmlsZXBhdGhcIiwgXCJwZ19yZWxhdGlvbl9zaXplXCIsIFwicGdfcmVsb2FkX2NvbmZcIiwgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5fY3JlYXRlXCIsIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX2Ryb3BcIixcbiAgICAgICAgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5fb2lkXCIsIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX3Byb2dyZXNzXCIsIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX3Nlc3Npb25faXNfc2V0dXBcIixcbiAgICAgICAgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5fc2Vzc2lvbl9wcm9ncmVzc1wiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl9zZXNzaW9uX3Jlc2V0XCIsIFwicGdfcmVwbGljYXRpb25fb3JpZ2luX3Nlc3Npb25fc2V0dXBcIixcbiAgICAgICAgXCJwZ19yZXBsaWNhdGlvbl9vcmlnaW5feGFjdF9yZXNldFwiLCBcInBnX3JlcGxpY2F0aW9uX29yaWdpbl94YWN0X3NldHVwXCIsIFwicGdfcm90YXRlX2xvZ2ZpbGVcIiwgXCJwZ19zaXplX2J5dGVzXCIsIFwicGdfc2l6ZV9wcmV0dHlcIixcbiAgICAgICAgXCJwZ19zbGVlcFwiLCBcInBnX3NsZWVwX2ZvclwiLCBcInBnX3NsZWVwX3VudGlsXCIsIFwicGdfc3RhcnRfYmFja3VwXCIsIFwicGdfc3RhdF9maWxlXCIsIFwicGdfc3RvcF9iYWNrdXBcIiwgXCJwZ19zd2l0Y2hfeGxvZ1wiLFxuICAgICAgICBcInBnX3RhYmxlX2lzX3Zpc2libGVcIiwgXCJwZ190YWJsZV9zaXplXCIsIFwicGdfdGFibGVzcGFjZV9kYXRhYmFzZXNcIiwgXCJwZ190YWJsZXNwYWNlX2xvY2F0aW9uXCIsIFwicGdfdGFibGVzcGFjZV9zaXplXCIsXG4gICAgICAgIFwicGdfdG90YWxfcmVsYXRpb25fc2l6ZVwiLCBcInBnX3RyaWdnZXJfZGVwdGhcIiwgXCJwZ190cnlfYWR2aXNvcnlfbG9ja1wiLCBcInBnX3RyeV9hZHZpc29yeV9sb2NrX3NoYXJlZFwiLCBcInBnX3RyeV9hZHZpc29yeV94YWN0X2xvY2tcIixcbiAgICAgICAgXCJwZ190cnlfYWR2aXNvcnlfeGFjdF9sb2NrX3NoYXJlZFwiLCBcInBnX3RzX2NvbmZpZ19pc192aXNpYmxlXCIsIFwicGdfdHNfZGljdF9pc192aXNpYmxlXCIsIFwicGdfdHNfcGFyc2VyX2lzX3Zpc2libGVcIixcbiAgICAgICAgXCJwZ190c190ZW1wbGF0ZV9pc192aXNpYmxlXCIsIFwicGdfdHlwZV9pc192aXNpYmxlXCIsIFwicGdfdHlwZW9mXCIsIFwicGdfeGFjdF9jb21taXRfdGltZXN0YW1wXCIsIFwicGdfeGxvZ19sb2NhdGlvbl9kaWZmXCIsXG4gICAgICAgIFwicGdfeGxvZ19yZXBsYXlfcGF1c2VcIiwgXCJwZ194bG9nX3JlcGxheV9yZXN1bWVcIiwgXCJwZ194bG9nZmlsZV9uYW1lXCIsIFwicGdfeGxvZ2ZpbGVfbmFtZV9vZmZzZXRcIiwgXCJwaHJhc2V0b190c3F1ZXJ5XCIsXG4gICAgICAgIFwicGxhaW50b190c3F1ZXJ5XCIsIFwicG9pbnRcIiwgXCJwb2x5Z29uXCIsIFwicG9wZW5cIiwgXCJwcXNlcnZlcnZlcnNpb25cIiwgXCJxdWVyeV90b194bWxcIiwgXCJxdWVyeXRyZWVcIiwgXCJxdW90ZV9udWxsYWJsZVwiLCBcInJhZGl1c1wiLFxuICAgICAgICBcInJhbmdlX21lcmdlXCIsIFwicmVnZXhwX21hdGNoZXNcIiwgXCJyZWdleHBfc3BsaXRfdG9fYXJyYXlcIiwgXCJyZWdleHBfc3BsaXRfdG9fdGFibGVcIiwgXCJyZWdyX2F2Z3hcIiwgXCJyZWdyX2F2Z3lcIiwgXCJyZWdyX2NvdW50XCIsXG4gICAgICAgIFwicmVncl9pbnRlcmNlcHRcIiwgXCJyZWdyX3IyXCIsIFwicmVncl9zbG9wZVwiLCBcInJlZ3Jfc3h4XCIsIFwicmVncl9zeHlcIiwgXCJyZWdyX3N5eVwiLCBcInJpZ2h0XCIsIFwicm93X3NlY3VyaXR5X2FjdGl2ZVwiLCBcInJvd190b19qc29uXCIsXG4gICAgICAgIFwicnBhZFwiLCBcInNjYWxlXCIsIFwic2V0X21hc2tsZW5cIiwgXCJzZXRzZWVkXCIsIFwic2V0dmFsXCIsIFwic2V0d2VpZ2h0XCIsIFwic2hvYmpfZGVzY3JpcHRpb25cIiwgXCJzaW5kXCIsIFwic3ByaW50ZlwiLCBcInN0YXRlbWVudF90aW1lc3RhbXBcIixcbiAgICAgICAgXCJzdGRkZXZcIiwgXCJzdHJpbmdfYWdnXCIsIFwic3RyaW5nX3RvX2FycmF5XCIsIFwic3RyaXBcIiwgXCJzdWJzdHJcIiwgXCJ0YWJsZV90b194bWxcIiwgXCJ0YWJsZV90b194bWxfYW5kX3htbHNjaGVtYVwiLCBcInRhbmRcIiwgXCJ0ZXh0XCIsXG4gICAgICAgIFwidG9fanNvblwiLCBcInRvX3JlZ2NsYXNzXCIsIFwidG9fcmVnbmFtZXNwYWNlXCIsIFwidG9fcmVnb3BlclwiLCBcInRvX3JlZ29wZXJhdG9yXCIsIFwidG9fcmVncHJvY1wiLCBcInRvX3JlZ3Byb2NlZHVyZVwiLCBcInRvX3JlZ3JvbGVcIixcbiAgICAgICAgXCJ0b19yZWd0eXBlXCIsIFwidG9fdHNxdWVyeVwiLCBcInRvX3RzdmVjdG9yXCIsIFwidHJhbnNhY3Rpb25fdGltZXN0YW1wXCIsIFwidHNfZGVidWdcIiwgXCJ0c19kZWxldGVcIiwgXCJ0c19maWx0ZXJcIiwgXCJ0c19oZWFkbGluZVwiLFxuICAgICAgICBcInRzX2xleGl6ZVwiLCBcInRzX3BhcnNlXCIsIFwidHNfcmFua1wiLCBcInRzX3JhbmtfY2RcIiwgXCJ0c19yZXdyaXRlXCIsIFwidHNfc3RhdFwiLCBcInRzX3Rva2VuX3R5cGVcIiwgXCJ0c3F1ZXJ5X3BocmFzZVwiLCBcInRzdmVjdG9yX3RvX2FycmF5XCIsXG4gICAgICAgIFwidHN2ZWN0b3JfdXBkYXRlX3RyaWdnZXJcIiwgXCJ0c3ZlY3Rvcl91cGRhdGVfdHJpZ2dlcl9jb2x1bW5cIiwgXCJ0eGlkX2N1cnJlbnRcIiwgXCJ0eGlkX2N1cnJlbnRfc25hcHNob3RcIiwgXCJ0eGlkX3NuYXBzaG90X3hpcFwiLFxuICAgICAgICBcInR4aWRfc25hcHNob3RfeG1heFwiLCBcInR4aWRfc25hcHNob3RfeG1pblwiLCBcInR4aWRfdmlzaWJsZV9pbl9zbmFwc2hvdFwiLCBcInVubmVzdFwiLCBcInVwcGVyX2luY1wiLCBcInVwcGVyX2luZlwiLCBcInZhcmlhbmNlXCIsIFwid2lkdGhcIixcbiAgICAgICAgXCJ3aWR0aF9idWNrZXRcIiwgXCJ4bWxfaXNfd2VsbF9mb3JtZWRcIiwgXCJ4bWxfaXNfd2VsbF9mb3JtZWRfY29udGVudFwiLCBcInhtbF9pc193ZWxsX2Zvcm1lZF9kb2N1bWVudFwiLCBcInhtbGFnZ1wiLCBcInhtbGNvbW1lbnRcIixcbiAgICAgICAgXCJ4bWxjb25jYXRcIiwgXCJ4bWxlbGVtZW50XCIsIFwieG1sZXhpc3RzXCIsIFwieG1sZm9yZXN0XCIsIFwieG1scGFyc2VcIiwgXCJ4bWxwaVwiLCBcInhtbHJvb3RcIiwgXCJ4bWxzZXJpYWxpemVcIiwgXCJ4cGF0aFwiLCBcInhwYXRoX2V4aXN0c1wiXG4gICAgXSxcbiAgICBidWlsdGluVmFyaWFibGVzOiBbXSxcbiAgICBwc2V1ZG9Db2x1bW5zOiBbXSxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnRzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAcHNldWRvQ29sdW1ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BudW1iZXJzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHN0cmluZ3MnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tcGxleElkZW50aWZpZXJzJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHNjb3BlcycgfSxcbiAgICAgICAgICAgIFsvWzssLl0vLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICBbL1soKV0vLCAnQGJyYWNrZXRzJ10sXG4gICAgICAgICAgICBbL1tcXHdAIyRdKy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdvcGVyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGJ1aWx0aW5WYXJpYWJsZXMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGJ1aWx0aW5GdW5jdGlvbnMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9bPD49ISUmK1xcLSovfH5eXS8sICdvcGVyYXRvciddLFxuICAgICAgICBdLFxuICAgICAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICAgICAgICBbL1xccysvLCAnd2hpdGUnXVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50czogW1xuICAgICAgICAgICAgWy8tLSsuKi8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sIHsgdG9rZW46ICdjb21tZW50LnF1b3RlJywgbmV4dDogJ0Bjb21tZW50JyB9XVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1teKi9dKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICAvLyBOb3Qgc3VwcG9ydGluZyBuZXN0ZWQgY29tbWVudHMsIGFzIG5lc3RlZCBjb21tZW50cyBzZWVtIHRvIG5vdCBiZSBzdGFuZGFyZD9cbiAgICAgICAgICAgIC8vIGkuZS4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MjgxNzIvYXJlLXRoZXJlLW11bHRpbGluZS1jb21tZW50LWRlbGltaXRlcnMtaW4tc3FsLXRoYXQtYXJlLXZlbmRvci1hZ25vc3RpY1xuICAgICAgICAgICAgLy8gWy9cXC9cXCovLCB7IHRva2VuOiAnY29tbWVudC5xdW90ZScsIG5leHQ6ICdAcHVzaCcgfV0sICAgIC8vIG5lc3RlZCBjb21tZW50IG5vdCBhbGxvd2VkIDotKFxuICAgICAgICAgICAgWy9cXCpcXC8vLCB7IHRva2VuOiAnY29tbWVudC5xdW90ZScsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvLi8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgcHNldWRvQ29sdW1uczogW1xuICAgICAgICAgICAgWy9bJF1bQS1aYS16X11bXFx3QCMkXSovLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQHBzZXVkb0NvbHVtbnMnOiAncHJlZGVmaW5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnaWRlbnRpZmllcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICBdLFxuICAgICAgICBudW1iZXJzOiBbXG4gICAgICAgICAgICBbLzBbeFhdWzAtOWEtZkEtRl0qLywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9bJF1bKy1dKlxcZCooXFwuXFxkKik/LywgJ251bWJlciddLFxuICAgICAgICAgICAgWy8oKFxcZCsoXFwuXFxkKik/KXwoXFwuXFxkKykpKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlciddXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgICAgIFsvJy8sIHsgdG9rZW46ICdzdHJpbmcnLCBuZXh0OiAnQHN0cmluZycgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXiddKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvJycvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLycvLCB7IHRva2VuOiAnc3RyaW5nJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGNvbXBsZXhJZGVudGlmaWVyczogW1xuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdpZGVudGlmaWVyLnF1b3RlJywgbmV4dDogJ0BxdW90ZWRJZGVudGlmaWVyJyB9XVxuICAgICAgICBdLFxuICAgICAgICBxdW90ZWRJZGVudGlmaWVyOiBbXG4gICAgICAgICAgICBbL1teXCJdKy8sICdpZGVudGlmaWVyJ10sXG4gICAgICAgICAgICBbL1wiXCIvLCAnaWRlbnRpZmllciddLFxuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdpZGVudGlmaWVyLnF1b3RlJywgbmV4dDogJ0Bwb3AnIH1dXG4gICAgICAgIF0sXG4gICAgICAgIHNjb3BlczogW11cbiAgICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3JlZHNoaWZ0L3JlZHNoaWZ0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcmVkc2hpZnQvcmVkc2hpZnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyJdLCJzb3VyY2VSb290IjoiIn0=