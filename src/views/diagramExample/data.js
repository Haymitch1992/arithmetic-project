/**
 * 这里放置json 数据撑起组件内容
 */
export const nodeList = [
    {
        label: '数据合并',
        nodeSwitch: true,
        nodeItem: [{
            name: '拆分',
            node_type: 'item-4',
            component_id: 'split_datasets',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            is_generate_model: "false",
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0, 1],
            out_ports_text: ['训练集', '测试集'],
            out_ports_name: ['train_data', 'test_data'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'split-input', // 输入框
                            "label": "切分范围",
                            "value": {
                                "node_params": {
                                    "split_prop": 0.8
                                }
                            },
                            "tag": "split_prop"
                        }
                    ]
                }
            ]
        }, {
            name: '类型转换',
            node_type: 'item-4',
            component_id: 'type_convert',
            iconClassName: 'el-icon-loading',
            is_generate_model: "false",
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            out_ports_name: ['input_data_type_convert'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "转为double类型的列",
                            "placeholder": "转为double类型的列",
                            "value": {
                                "node_params": {
                                    "select_double_columns": []
                                }
                            },
                            "tag": "select_double_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "转为int类型的列",
                            "placeholder": "转为int类型的列",
                            "value": {
                                "node_params": {
                                    "select_int_columns": []
                                }
                            },
                            "tag": "select_int_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "转为字符串的列",
                            "placeholder": "转为字符串的列",
                            "value": {
                                "node_params": {
                                    "select_str_columns": []
                                }
                            },
                            "tag": "select_str_columns"
                        }
                    ]
                }
            ]
        }, {
            name: '哑变量处理',
            node_type: 'item-4',
            component_id: 'dummies',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            is_generate_model: "false",
            out_ports_name: ['input_data_dummies'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }
            ]
        }, {
            name: '标准化',
            node_type: 'item-4',
            component_id: 'standard_scale',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            is_generate_model: "false",
            out_ports_text: ['输出'],
            out_ports_name: ['input_data_standard_scale'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }
            ]
        }, {
            name: '归一化',
            component_id: 'minmax_scale',
            is_generate_model: "false",
            node_type: 'item-4',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            out_ports_name: ['input_data_minmax_scale'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }
            ]
        }, {
            name: '因子化处理',
            component_id: 'factorize',
            is_generate_model: "false",
            node_type: 'item-4',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            out_ports_name: ['input_data_factorize'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }
            ]
        }, {
            name: '缺失值填充',
            component_id: 'fill_nan',
            is_generate_model: "false",
            node_type: 'item-4',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            out_ports_name: ['input_data_fill_nan'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "填充方法",
                            "value": {
                                "node_params": {
                                    "methods": 'mean'
                                }
                            },
                            "options": [
                                {
                                    "label": "mean",
                                    "value": "mean"
                                },
                                {
                                    "label": "mode",
                                    "value": "mode"
                                },
                                {
                                    "label": "median",
                                    "value": "median"
                                }
                            ],
                            "tag": "methods"
                        }
                    ]
                }
            ]
        }, {
            name: '不平衡处理',
            component_id: 'smote',
            is_generate_model: "false",
            node_type: 'item-4',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            out_ports_name: ['input_data_smote'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择特征列",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "placeholder": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }
            ]
        }]
    },
    {
        label: '采样与过滤',
        nodeSwitch: true,
        nodeItem: [{
            name: '随机采样',
            component_id: 'random_sample',
            node_type: 'item-4',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            is_generate_model: "false",
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            out_ports_name: ['input_data_random_sample'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "采样比例",
                            "value": {
                                "node_params": {
                                    "sample_prop": 0.8
                                }
                            },
                            "tag": "sample_prop"
                        }
                    ]
                }
            ]
        },
        {
            name: '分层采样',
            component_id: 'level_sample',
            node_type: 'item-4',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            is_generate_model: "false",
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            out_ports_name: ['input_data_level_sample'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择分组列",
                            "placeholder": "选择分组列",
                            "value": {
                                "node_params": {
                                    "select_target_column": []
                                }
                            },
                            "tag": "select_target_column"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "分层采样比例",
                            "value": {
                                "node_params": {
                                    "sample_prop_dict": "A:0.2,B:0.5,C:0.3"
                                }
                            },
                            "tag": "sample_prop_dict"
                        }
                    ]
                }
            ]
        }]
    }
];
export const nodeList2 = [
    {
        label: '特征变换',
        nodeSwitch: true,
        nodeItem: [{
            name: '特征尺度变换',
            component_id: 'transform_feature',
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            is_generate_model: "false",
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            out_ports_name: ['input_data_transform'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "选择尺度变换函数",
                            "value": {
                                "node_params": {
                                    "transform_method": 'log2'
                                }
                            },
                            "options": [
                                {
                                    "label": "log2",
                                    "value": "log2"
                                },
                                {
                                    "label": "log10",
                                    "value": "log10"
                                },
                                {
                                    "label": "ln",
                                    "value": "ln"
                                },
                                {
                                    "label": "abs",
                                    "value": "abs"
                                },
                                {
                                    "label": "sqrt",
                                    "value": "sqrt"
                                },
                                {
                                    "label": "pow2",
                                    "value": "pow2"
                                }
                            ],
                            "tag": "transform_method"
                        }
                    ]
                }
            ]
        }, {
            name: '特征异常平滑',
                node_type: 'item-1',
                component_id: 'soften_feature',
            is_generate_model: "false",
            in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['dataset_path'],
            out_ports: [0],
                out_ports_text: ['输出'],
                out_ports_name: ['input_data_soften'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-8', // 输入框
                            "label": "平滑方法",
                            "value": {
                                "node_params": {
                                    "soften_method": 'zscore_soften'
                                }
                            },
                            "tag": "soften_method"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default2', // 输入框
                            "label": "采样比例",
                            "value": {
                                "node_params": {
                                    "para1": ''
                                }
                            },
                            "tag": "para1"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default2', // 输入框
                            "label": "采样比例",
                            "value": {
                                "node_params": {
                                    "para2": ''
                                }
                            },
                            "tag": "para2"
                        }
                    ]
                }
            ]
        }, {
                name: '特征离散',
                component_id: 'discretize_feature',
                node_type: 'item-1',
                is_generate_model: "false",
            in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['dataset_path'],
            out_ports: [0],
                out_ports_text: ['输出'],
                out_ports_name: ['input_data_discretize'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "离散方法",
                            "value": {
                                "node_params": {
                                    "discretize_method": 'isometric_discretize'
                                }
                            },
                            "options": [
                                {
                                    "label": "等距离散",
                                    "value": "isometric_discretize"
                                },
                                {
                                    "label": "等频离散",
                                    "value": "isofrequecy_discretize"
                                }
                            ],
                            "tag": "discretize_method"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "离散区间",
                            "value": {
                                "node_params": {
                                    "discretize_range": '100'
                                }
                            },
                            "tag": "discretize_range"
                        }
                    ]
                }
            ]
        }, {
            name: '生成统计类特征',
            component_id: 'statistics_feature',
            is_generate_model: "false",
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
            out_ports_name: ['input_data_statistics'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "统计方法",
                            // 参数列表
                            "options": [
                                {
                                    "label": "max",
                                    "value": "max"
                                },
                                {
                                    "label": "min",
                                    "value": "min"
                                },
                                {
                                    "label": "mean",
                                    "value": "mean"
                                },
                                {
                                    "label": "median",
                                    "value": "median"
                                },
                                {
                                    "label": "std",
                                    "value": "std"
                                },
                                {
                                    "label": "var",
                                    "value": "var"
                                }
                            ],
                            "value": {
                                "node_params": {
                                    "statistics_method": 'max'
                                }
                            },
                            "tag": "statistics_method"
                        }
                    ]
                }
            ]
        }, {
            name: '奇异值分解(SVD)',
                node_type: 'item-1',
                is_generate_model: "false",
                component_id: 'svd_feature',
            in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['dataset_path'],
            out_ports: [0, 1, 2],
                out_ports_text: ['左奇异矩阵', '奇异值矩阵', '右奇异矩阵'],
                out_ports_name: ['input_data_svdutable', 'input_data_svdstable', 'input_data_svdvtable'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "保留奇异值个数",
                            "value": {
                                "node_params": {
                                    "number_remain": '1'
                                }
                            },
                            "tag": "number_remain"
                        }
                    ]
                }
            ]
        }, {
            name: '主成分分析(PCA)',
            component_id: 'pca_feature',
            is_generate_model: "false",
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            in_ports_name: ['dataset_path'],
            out_ports: [0],
            out_ports_text: ['输出'],
                iconClassName: 'el-icon-loading',
                out_ports_name: ['input_data_pca'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择列",
                            "placeholder": "选择列",
                            "value": {
                                "node_params": {
                                    "select_columns": []
                                }
                            },
                            "tag": "select_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "附加列",
                            "placeholder": "附加列",
                            "value": {
                                "node_params": {
                                    "attached_columns": []
                                }
                            },
                            "tag": "attached_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "信息量比例",
                            "value": {
                                "node_params": {
                                    "n_components": '0.9'
                                }
                            },
                            "tag": "n_components"
                        }
                    ]
                }
            ]
        }]
    },
    {
        label: '特征重要性评估',
        nodeSwitch: true,
        nodeItem: [
            {
                name: '线性模型特征重要性',
                component_id: 'linear_evaluation',
                is_generate_model: "false",
                node_type: 'item-1',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['model_path'],
                out_ports: [0],
                out_ports_text: ['输出'],
                iconClassName: 'el-icon-loading',
                out_ports_name: ['input_data_linear_features_eval'],
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择特征列",
                                "placeholder": "选择特征列",
                                "value": {
                                    "node_params": {
                                        "select_feature_columns": []
                                    }
                                },
                                "tag": "select_feature_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择标签列",
                                "placeholder": "选择标签列",
                                "value": {
                                    "node_params": {
                                        "select_target_columns": []
                                    }
                                },
                                "tag": "select_target_columns"
                            }
                        ]
                    }
                ]
            },
            {
                name: '随机森林特征重要性',
                component_id: 'randomforest_evaluation',
                is_generate_model: "false",
                node_type: 'item-1',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['model_path'],
                out_ports: [0],
                out_ports_text: ['输出'],
                iconClassName: 'el-icon-loading',
                out_ports_name: ['input_data_rf_features_eval'],
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择特征列",
                                "placeholder": "选择特征列",
                                "value": {
                                    "node_params": {
                                        "select_feature_columns": []
                                    }
                                },
                                "tag": "select_feature_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择标签列",
                                "placeholder": "选择标签列",
                                "value": {
                                    "node_params": {
                                        "select_target_columns": []
                                    }
                                },
                                "tag": "select_target_columns"
                            }
                        ]
                    }
                ]
            }]
    },
    {
        label: '特征选择',
        nodeSwitch: true,
        nodeItem: [ {
            name: '过滤式特征选择',
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": "1",
                            "tag": "select_characteristic"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "选择标签列",
                            "value": "2",
                            "tag": "select_tag"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "树的个数",
                            "value": "3",
                            "tag": "near_number"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "单棵树的最大深度",
                            "value": "1",
                            "tag": "near_number"
                        }
                    ]
                }
            ]
        }]
    },
    {
        label: '特征生成',
        nodeSwitch: true,
        nodeItem: [ {
            name: '特征编码',
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": "1",
                            "tag": "select_characteristic"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "选择标签列",
                            "value": "2",
                            "tag": "select_tag"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "树的个数",
                            "value": "3",
                            "tag": "near_number"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "单棵树的最大深度",
                            "value": "1",
                            "tag": "near_number"
                        }
                    ]
                }
            ]
        }]
    },
    {
        label: '异常检测',
        nodeSwitch: true,
        nodeItem: [ {
            name: '异常检测模块',
            node_type: 'item-1',
            in_ports: [0],
            in_ports_text: ['输入'],
            out_ports: [0],
            out_ports_text: ['输出'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": "1",
                            "tag": "select_characteristic"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "选择标签列",
                            "value": "2",
                            "tag": "select_tag"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "树的个数",
                            "value": "3",
                            "tag": "near_number"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "单棵树的最大深度",
                            "value": "1",
                            "tag": "near_number"
                        }
                    ]
                }
            ]
        }]
    }
];
export const nodeList3 = [
    {
        label: '分类算法',
        nodeSwitch: true,
        nodeItem: [{
            name: '分类-KNN',
            component_id: 'cla_knn',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            tag_type: 'arithmetic',
            out_ports_text: ['输出模型'],
            out_ports_name: ['cla_knn_model'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'split-input', // 输入框
                            "label": "邻近个数",
                            "value": {
                                "node_params": {
                                    "n_neighbors": 2
                                }
                            },
                            "tag": "n_neighbors"
                        }
                    ]
                }
            ]
        }, {
            name: '逻辑回归',
            component_id: 'cla_lr',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            tag_type: 'arithmetic',
            out_ports_text: ['输出模型'],
            out_ports_name: ['cla_lr_model'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "正则项类型",
                            "value": {
                                "node_params": {
                                    "regularization": 'L1'
                                }
                            },
                            "options": [
                                {
                                    "label": "None",
                                    "value": "None"
                                },
                                {
                                    "label": "L1",
                                    "value": "L1"
                                },
                                {
                                    "label": "L2",
                                    "value": "L2"
                                }
                            ],
                            "tag": "regularization"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "正则项系数",
                            "value": {
                                "node_params": {
                                    "regularization_coeff": '1.0'
                                }
                            },
                            "tag": "regularization_coeff"
                        }
                    ]
                }
            ]
        }, {
            name: '分类-支持向量机',
            component_id: 'cla_svc',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            tag_type: 'arithmetic',
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            out_ports_text: ['输出模型'],
            out_ports_name: ['cla_svc_model'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "placeholder": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "核函数选择",
                            "value": {
                                "node_params": {
                                    "select_kernel": 'rbf'
                                }
                            },
                            "options": [
                                {
                                    "label": "rbf",
                                    "value": "rbf"
                                },
                                {
                                    "label": "linear",
                                    "value": "linear"
                                },
                                {
                                    "label": "poly",
                                    "value": "poly"
                                },
                                {
                                    "label": "sigmoid",
                                    "value": "sigmoid"
                                }
                            ],
                            "tag": "select_kernel"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "正则项系数",
                            "value": {
                                "node_params": {
                                    "regularization_coeff": '1.0'
                                }
                            },
                            "tag": "regularization_coeff"
                        }
                    ]
                }
            ]
        }, {
            name: '分类-随机森林',
            component_id: 'cla_rf',
            node_type: 'item-2',
            in_ports: [0],
            tag_type: 'arithmetic',
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            out_ports_text: ['输出模型'],
            out_ports_name: ['cla_rf_model'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "森林中树的个数",
                            "value": {
                                "node_params": {
                                    "n_estimators": '100'
                                }
                            },
                            "tag": "n_estimators"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "单棵树的最大深度",
                            "value": {
                                "node_params": {
                                    "max_depth": 'None'
                                }
                            },
                            "tag": "max_depth"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "叶节点数据的最小个数",
                            "value": {
                                "node_params": {
                                    "min_samples_leaf": '1'
                                }
                            },
                            "tag": "min_samples_leaf"
                        }
                    ]
                }
            ]
        }]
    },
    {
        label: '回归算法',
        nodeSwitch: true,
        nodeItem: [{
            name: '回归-KNN',
            component_id: 'reg_knn',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            is_generate_model: "true",
            in_ports: [0],
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            tag_type: 'arithmetic2',
            out_ports_text: ['输出模型'],
            out_ports_name: ['reg_knn_model'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'split-input', // 输入框
                            "label": "邻近个数",
                            "value": {
                                "node_params": {
                                    "n_neighbors": 2
                                }
                            },
                            "tag": "n_neighbors"
                        }
                    ]
                }
            ]
        }, {
            name: '回归-支持向量机',
            component_id: 'reg_svr',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            is_generate_model: "true",
            tag_type: 'arithmetic2',
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            out_ports_text: ['输出模型'],
            out_ports_name: ['reg_svr_model'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "placeholder": "选择标签列",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'select-options', // 输入框
                            "label": "核函数选择",
                            "value": {
                                "node_params": {
                                    "select_kernel": 'rbf'
                                }
                            },
                            "options": [
                                {
                                    "label": "rbf",
                                    "value": "rbf"
                                },
                                {
                                    "label": "linear",
                                    "value": "linear"
                                },
                                {
                                    "label": "poly",
                                    "value": "poly"
                                },
                                {
                                    "label": "sigmoid",
                                    "value": "sigmoid"
                                }
                            ],
                            "tag": "select_kernel"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "正则项系数",
                            "value": {
                                "node_params": {
                                    "regularization_coeff": '1.0'
                                }
                            },
                            "tag": "regularization_coeff"
                        }
                    ]
                }
            ]
        }, {
            name: '回归-随机森林',
            component_id: 'reg_rf',
            node_type: 'item-2',
            is_generate_model: "true",
            in_ports: [0],
            tag_type: 'arithmetic2',
            in_ports_text: ['数据输入'],
            in_ports_name: ['train_csv_path'],
            out_ports: [0],
            out_ports_text: ['输出模型'],
            out_ports_name: ['reg_rf_model'],
            iconClassName: 'el-icon-loading',
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择标签列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_target_columns": []
                                }
                            },
                            "tag": "select_target_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "森林中树的个数",
                            "value": {
                                "node_params": {
                                    "n_estimators": '100'
                                }
                            },
                            "tag": "n_estimators"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "单棵树的最大深度",
                            "value": {
                                "node_params": {
                                    "max_depth": 'None'
                                }
                            },
                            "tag": "max_depth"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "叶节点数据的最小个数",
                            "value": {
                                "node_params": {
                                    "min_samples_leaf": '1'
                                }
                            },
                            "tag": "min_samples_leaf"
                        }
                    ]
                }
            ]
        }
        ]
    },
    {
        label: '聚类算法',
        nodeSwitch: true,
        nodeItem: [{
            name: 'kMeans',
            component_id: 'kmeans',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            tag_type: 'arithmetic3',
            in_ports_text: ['数据输入'],
            in_ports_name: ['csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            out_ports_text: ['输出模型'],
            out_ports_name: ['cluster_data'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "聚类个数",
                            "value": {
                                "node_params": {
                                    "n_clusters": '8'
                                }
                            },
                            "tag": "n_clusters"
                        }
                    ]
                }
            ]
        },
        {
            name: 'DBSCAN',
            component_id: 'dbscan',
            node_type: 'item-2',
            iconClassName: 'el-icon-loading',
            in_ports: [0],
            tag_type: 'arithmetic3',
            in_ports_text: ['数据输入'],
            in_ports_name: ['csv_path'],
            out_ports: [0],
            is_generate_model: "true",
            out_ports_text: ['输出模型'],
            out_ports_name: ['cluster_data'],
            form: [
                {
                    "label": "字段设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'btn', // 输入框
                            "label": "选择特征列",
                            "placeholder": "选择要标注修改的表头",
                            "value": {
                                "node_params": {
                                    "select_feature_columns": []
                                }
                            },
                            "tag": "select_feature_columns"
                        }
                    ]
                }, {
                    "label": "参数设置",
                    "data": [
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "邻域点距离阈值",
                            "value": {
                                "node_params": {
                                    "distance_threshold": '0.5'
                                }
                            },
                            "tag": "distance_threshold"
                        },
                        {
                            // 类型判断 下拉框|输入框
                            "type": 'input-default', // 输入框
                            "label": "核心对象密度阈值",
                            "value": {
                                "node_params": {
                                    "density_threshold": '8'
                                }
                            },
                            "tag": "density_threshold"
                        }
                    ]
                }
            ]
        }
        ]
    }
];
export const nodeList4 = [
    {
        label: '预测', // 预测节点
        nodeSwitch: true,
        nodeItem: [
            {
                name: '模型测试',
                component_id: 'test_model',
                node_type: 'item-3',
                iconClassName: 'el-icon-loading',
                in_ports: [0, 1],
                in_ports_text: ['模型结果输入', '预测数据输入'],
                in_ports_name: ['model_path', 'test_csv_path'],
                out_ports: [0],
                out_ports_text: ['预测结果输出'],
                out_ports_name: ['test_result'],
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择特征列",
                                "placeholder": "选择要标注修改的表头",
                                "value": {
                                    "node_params": {
                                        "select_feature_columns": []
                                    }
                                },
                                "tag": "select_feature_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择标签列",
                                "value": {
                                    "node_params": {
                                        "select_target_columns": []
                                    }
                                },
                                "tag": "select_target_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'input-default', // 输入框
                                "label": "预测结果列名",
                                "placeholder": "选择要标注修改的表头",
                                "value": {
                                    "node_params": {
                                        "predict_target_columns": "prediction_result"
                                    }
                                },
                                "tag": "predict_target_columns"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: '评估',
        nodeSwitch: true,
        nodeItem: [
            {
                name: '二分类评估',
                component_id: 'binary_classifier_eval',
                node_type: 'item-3',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['test_data_predict'],
                out_ports: [],
                out_ports_text: [],
                out_ports_name: [],
                iconClassName: 'el-icon-loading',
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "原始标签列名",
                                "placeholder": "原始标签列名",
                                "value": {
                                    "node_params": {
                                        "original_target_columns": []
                                    }
                                },
                                "tag": "original_target_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'input-default', // 输入框
                                "label": "预测结果列名",
                                "placeholder": "选择要标注修改的表头",
                                "value": {
                                    "node_params": {
                                        "predict_target_columns": "prediction_result"
                                    }
                                },
                                "tag": "predict_target_columns"
                            }
                        ]
                    }
                ]
            },
            {
                name: '多分类评估',
                component_id: 'multi_classifier_eval',
                node_type: 'item-3',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['test_data_predict'],
                out_ports: [],
                out_ports_text: [],
                out_ports_name: [],
                iconClassName: 'el-icon-loading',
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "原始标签列名",
                                "placeholder": "原始标签列名",
                                "value": {
                                    "node_params": {
                                        "original_target_columns": []
                                    }
                                },
                                "tag": "original_target_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'input-default', // 输入框
                                "label": "预测结果列名",
                                "placeholder": "选择要标注修改的表头",
                                "value": {
                                    "node_params": {
                                        "predict_target_columns": "prediction_result"
                                    }
                                },
                                "tag": "predict_target_columns"
                            }
                        ]
                    }
                ]
            },
            {
                name: '回归评估',
                component_id: 'regressor_eval',
                node_type: 'item-3',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['test_data_predict'],
                out_ports: [],
                out_ports_text: [],
                out_ports_name: [],
                iconClassName: 'el-icon-loading',
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "原始标签列名",
                                "placeholder": "原始标签列名",
                                "value": {
                                    "node_params": {
                                        "original_target_columns": []
                                    }
                                },
                                "tag": "original_target_columns"
                            },
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'input-default', // 输入框
                                "label": "预测结果列名",
                                "placeholder": "选择要标注修改的表头",
                                "value": {
                                    "node_params": {
                                        "predict_target_columns": "prediction_result"
                                    }
                                },
                                "tag": "predict_target_columns"
                            }
                        ]
                    }
                ]
            },
            {
                name: '聚类评估',
                component_id: 'cluster_eval',
                node_type: 'item-3',
                in_ports: [0],
                in_ports_text: ['输入'],
                in_ports_name: ['data_predict'], // 节点的输入名称
                out_ports: [],
                out_ports_text: [],
                out_ports_name: [],
                iconClassName: 'el-icon-loading',
                form: [
                    {
                        "label": "字段设置",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'btn', // 输入框
                                "label": "选择特征列",
                                "placeholder": "选择特征列",
                                "value": {
                                    "node_params": {
                                        "select_feature_columns": []
                                    }
                                },
                                "tag": "select_feature_columns"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export const nodeList5 = [
    {
        label: '预测',
        nodeSwitch: true,
        nodeItem: [
            {
                name: '数据集',
                node_type: 'item-4',
                component_id: 'load_data',
                iconClassName: 'el-icon-loading',
                in_ports: [],
                in_ports_text: [],
                in_ports_name: [],
                out_ports: [0],
                out_ports_text: ['输出'],
                out_ports_name: ['csv_path'],
                form: [
                    {
                        "label": "表名",
                        "data": [
                            {
                                // 类型判断 下拉框|输入框
                                "type": 'autoSelect', // 输入框
                                "label": "数据集名称",
                                "placeholder": "选择要标注修改的表头",
                                "value": "1",
                                "tag": 'csv_name,download_path'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
export const nodeLabel6 = [ {
    name: 'MNIST',
    node_type: 'item-4',
    iconClassName: 'el-icon-loading',
    form: [
        {
            "label": "信息",
            "data": [
                {
                    // 类型判断 下拉框|输入框
                    "type": 'input-default', // 输入框
                    "label": "名称",
                    "value": {
                        "node_params": {
                            "n_clusters": 'MNIST'
                        }
                    },
                    "tag": "n_clusters"
                },
                {
                    // 类型判断 下拉框|输入框
                    "type": 'textarea', // 输入框
                    "label": "描述",
                    "value": {
                        "node_params": {
                            "n_clusters": '数据集是机器学习领域中非常经典的一个数据集，由60000个训练样本和10000个测试样本组成，每个样本都是一张28 * 28像素的灰度手写数字图片'
                        }
                    },
                    "tag": "n_clusters"
                }
            ]
        }
    ]
}, {
    name: 'Fashion-MNIST',
    node_type: 'item-4',
    iconClassName: 'el-icon-loading',
    form: []
}];
