import React, {Component, Fragment} from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw,} from 'draft-js';
import debounce from 'lodash/debounce';
import BlockStyleControls from "./blockStyleControls";
import InlineStyleControls from "./inlineStylesControls";
import request from '../../helpers/request';


export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.focus = () => this.refs.editor.focus();
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.getBlockStyle = this._getBlockStyle.bind(this);
        this.state = {editorState: EditorState.createEmpty()}
    }

    onChange = (editorState) => {
        this.setState({ editorState }, () => {
            console.log(convertToRaw(editorState.getCurrentContent()));
            this._saveContent(editorState.getCurrentContent())
        })
    };

    async componentDidMount() {
        let id = this.props.id;
        if (id !== null){
            let response = await request(`users/editorcontent?id=${id}`, 'GET');
            let json = await response.json();
            if (response.ok) {
                console.log(json)
                this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content)))});
            }
        }
        // TODO: try setting state if only the person is not the one editing.
        // try to solve for when the second person starts editing
    }

    _getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _saveContent = debounce((content) => {
        let rawContent = JSON.stringify(convertToRaw(content));
        let user = this.props.id;

        // window.localStorage.setItem('content', rawContent);
        request('users/editorcontent', 'POST', {user, content: rawContent} );
    }, 1000)

    render() {

        const { editorState } = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (

                <div className="RichEditor-root tile is-child is-6">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockStyleFn={this.getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={this.mapKeyToEditorCommand}
                            onChange={this.onChange}
                            placeholder="What's on your mind?"
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
        );
    }
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};